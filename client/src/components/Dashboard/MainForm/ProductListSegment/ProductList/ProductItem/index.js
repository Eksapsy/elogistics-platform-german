import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { Grid, Segment, Button, Icon, Header } from 'semantic-ui-react';
import { formValueSelector, Field } from 'redux-form';
import DropdownField from '../../../DropdownField';
import InputNumber from '../../../InputNumber';


class ProductItem extends PureComponent {
  getProductFullname(product) {
    return product.id + '-' + product.name;
  }
  render() {
    const {index, namePrefix, productList} = this.props;
    const dbProducts = this.props.dataBinded.products.map((product) => {
      return {
        key: uuid(),
        value: this.getProductFullname(product),
        text: this.getProductFullname(product)
      };
    });
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={ 16 } computer={ 2 }>
              <ProductLabel productName={ productList[index].name || '' } />
            </Grid.Column>
            <Grid.Column mobile={ 16 } computer={ 8 }>
              <Segment color='blue'>
                <Field name={ `${namePrefix}.name` } type='text' placeholder='Product' data={ dbProducts } component={ DropdownField } />
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={ 16 } computer={ 4 }>
              <Segment color='blue'>
                <Field name={ `${namePrefix}.amount` } type='text' placeholder='Amount' minimumValue={ 1 } component={ InputNumber } />
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={ 16 } computer={ 2 } verticalAlign='middle'>
              <Button type='button' negative style={ { width: '100%' } } onClick={ () => {
                                                                                     this.props.fields.remove(index)
                                                                                   } }>
                <Icon name='minus' size='large' style={ { margin: 'auto' } } />
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      );
  }
}

class ProductLabel extends PureComponent {
  itemHeaderStyle = {
    transform: 'rotate(-60deg)',
    WebkitTransform: 'rotate(0deg)',
    width: '100%',
    backgroundColor: '#ffffff',
    borderTop: '8px solid #2980b9'
  }

  render() {
    const {productName} = this.props;
    const content = productName ? productName.substring(0, 3) + ' ' + productName.substring(4, 8) : '';
    return (
      <div>
        <Header content={ content } textAlign='center' size='large' block style={ this.itemHeaderStyle } floated='left' />
      </div>
      );
  }
}

const selector = formValueSelector('orderForm');
const mapStateToProps = (state) => {
  return {
    dataBinded: state.dataBinded,
    productList: selector(state, 'productList'),
  }
};

export default connect(mapStateToProps)(ProductItem);