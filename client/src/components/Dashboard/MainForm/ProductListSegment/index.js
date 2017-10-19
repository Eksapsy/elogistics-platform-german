import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { bindActionCreators } from 'redux';
import { Grid, Segment, Divider, Header, Icon, Dropdown, Button } from 'semantic-ui-react';
import _ from 'lodash';
import * as actions from '../../../../actions';
import uuid from 'uuid';
import AddProductComponent from './AddProductComponent';
import DropdownField from './DropdownField';
import InputNumber from './InputNumber';
import './styles.css'

class ProductListInput extends Component {
  getProductFullname(product) {
    return product.id + '-' + product.name;
  }

  render() {
    const {formProducts} = this.props;
    const products = this.props.dataBinded.products.map((product) => {
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
            <Divider hidden/>
            <Divider/>
            <Divider horizontal>
              <Header block textAlign='center' as='h3' color='blue'>
                <Header.Content>Products</Header.Content>
              </Header>
            </Divider>
          </Grid.Row>
          <Grid.Row width={ 16 }>
            <FieldArray name='productList' props={ { dataProducts: products, formProducts } } component={ ProductList } />
          </Grid.Row>
        </Grid>
      </div>
      );
  }
}

class ProductList extends Component {
  render() {
    const {dataProducts, formProducts} = this.props;
    return (
      <ul style={ { listStyle: 'none', width: '100%' } }>
        <li key={ uuid() }>
          <AddProductComponent fields={ this.props.fields } />
        </li>
        { this.props.fields.map((product, index) => {
            return (
              <li key={ uuid() }>
                <ProductItem namePrefix={ product } index={ index } formProducts={ formProducts } dataProducts={ dataProducts } fields={ this.props.fields }
                />
              </li>
              );
          }) }
      </ul>
      );
  }
}

class ProductItem extends Component {
  render() {
    const {dataProducts, index, formProducts, namePrefix} = this.props;
    const productName = formProducts[index].name;
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={ 16 } computer={ 2 }>
              <ProductLabel productName={ productName } />
            </Grid.Column>
            <Grid.Column mobile={ 16 } computer={ 8 }>
              <Segment color='blue'>
                <Field name={ `${namePrefix}.name` } type='text' placeholder='Product' data={ dataProducts } component={ DropdownField } />
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={ 16 } computer={ 4 }>
              <Segment color='blue'>
                <Field name={ `${namePrefix}.amount` } type='text' placeholder='Amount' minimumValue={ 1 } component={ InputNumber } />
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={ 16 } computer={ 2 } verticalAlign='middle'>
              <Button negative style={ { width: '100%' } } onClick={ () => {
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

class ProductLabel extends Component {
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

const selector = formValueSelector('productListSegment');
const mapStateToProps = (state) => {
  return {
    dataBinded: state.dataBinded,
    formProducts: selector(state, 'productList'),
    productAmount: selector(state, 'productAmount')
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dataActions: bindActionCreators(actions.dataActions, dispatch),
  }
}

export default reduxForm({
  form: 'productListSegment'
})(withRouter(connect(mapStateToProps, mapActionsToProps)(ProductListInput)));