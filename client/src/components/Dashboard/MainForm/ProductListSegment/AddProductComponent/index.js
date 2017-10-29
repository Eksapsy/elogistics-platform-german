import React, { Component } from 'react';
import { formValueSelector, change, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Grid, Icon, Segment, Button } from 'semantic-ui-react';
import _ from 'lodash';
import uuid from 'uuid';
import InputNumber from '../../InputNumber';
import DropdownField from '../../DropdownField';

class AddProductComponent extends Component {


  render() {
    const {dataBinded, productName, productAmount, productList} = this.props;
    return (
      <Grid centered stackable>
        <ProductFields productAmount={ productAmount } dataBinded={ dataBinded } productName={ productName } productList={productList} fields={this.props.fields} dispatch={this.props.dispatch}/>      
      </Grid>
      );
  }
}

class ProductFields extends Component {
  addProduct(e, data) {
    const {productName, productAmount} = this.props;
    if (productName && productAmount) {
      this.props.fields.push({
        name: productName,
        amount: productAmount
      });
      this.props.dispatch(change('orderForm', 'productSelection', ''));
      this.props.dispatch(change('orderForm', 'productAmount', ''));
    }
  }
  render() {
    const {dataBinded, productList} = this.props;
    return (
      <Grid.Row width={ 16 }>
        <Grid.Column mobile={ 16 } computer={ 8 }>
          <ProductNameField dataBinded={ dataBinded } productList={productList}/>
        </Grid.Column>
        <Grid.Column mobile={ 16 } computer={ 6 }>
          <ProductAmountField />
        </Grid.Column>
        <Grid.Column mobile={ 16 } computer={ 2 } verticalAlign='middle'>
          <Button type='button' onClick={ this.addProduct.bind(this) } positive style={ { width: '100%' } }>
            <Icon name='plus' size='large' style={ { margin: 'auto' } } fitted/>
          </Button>
        </Grid.Column>
      </Grid.Row>
      );
  }
}

class ProductNameField extends Component {
  getProductFullname(product) {
    return product.id + '-' + product.name;
  }
  // TOFIX: 
  filterProducts(products) {
    const {productList} = this.props;
    
    return _.filter(products, (product) => {
      return !_.find(productList, {name: product.text});
    });
  }

  render() {
    const products = this.props.dataBinded.products.map((product) => {
      return {
        key: uuid(),
        value: this.getProductFullname(product),
        text: this.getProductFullname(product),
      };
    });
    const productNames = this.filterProducts(products);
    return (

      <Segment color='red'>
        <Field name='productSelection' placeholder='Product' data={ productNames } component={ DropdownField } />
      </Segment>
      );
  }
}

class ProductAmountField extends Component {
  inputNumber = (props) => (
    <InputNumber {...props}/>
  );

  render() {
    return (
      <Segment color='red'>
        <Field name='productAmount' minimumValue={ 1 } component={ this.inputNumber } />
      </Segment>
      );
  }
}

const selector = formValueSelector('orderForm');
const mapStateToProps = (state) => {
  return {
    dataBinded: state.dataBinded,
    productName: selector(state, 'productSelection'),
    productAmount: selector(state, 'productAmount'),
    productList: selector(state, 'productList')
  }
};


export default connect(mapStateToProps)(AddProductComponent);