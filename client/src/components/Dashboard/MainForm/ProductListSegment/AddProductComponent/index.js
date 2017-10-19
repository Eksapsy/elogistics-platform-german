import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Icon, Segment, Dropdown, Button } from 'semantic-ui-react';
import _ from 'lodash';
import uuid from 'uuid';
import * as actions from '../../../../../actions';
import InputNumber from '../InputNumber';
import DropdownField from '../DropdownField';

class AddProductComponent extends Component {

  getProductFullname(product) {
    return product.id + '-' + product.name;
  }

  onKeyPress(e, data) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.onKeyPress(e, {
        ...this.state
      });
    }
  }

  addProduct(e, data) {
    const {productName, productAmount} = this.props;
    if (productName && productAmount) {
      this.props.fields.push({
        name: productName,
        amount: productAmount
      });
    }
  }

  // TOFIX: 
  filterProducts(products) {
    const {productList} = this.props;
    return products.filter((product) => {
      return !_.includes(productList, {
        name: product.text
      });
    });
  }

  render() {
    const products = this.props.dataBinded.products.map((product) => {
      return {
        key: uuid(),
        value: this.getProductFullname(product),
        text: this.getProductFullname(product)
      };
    });
    const productNames = this.filterProducts(products);

    return (
      <Grid centered stackable>
        <Grid.Row width={ 16 }>
          <Grid.Column mobile={ 16 } computer={ 8 }>
            <Segment color='red'>
              <Field name='addProductComponent.productSelection' placeholder='Product' data={ productNames } component={ DropdownField } />
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={ 16 } computer={ 6 }>
            <Segment color='red'>
              <Field name='addProductComponent.productAmount' onKeyPress={ this.onKeyPress.bind(this) } minimumValue={ 1 } component={ InputNumber } />
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={ 16 } computer={ 2 } verticalAlign='middle'>
            <Button onClick={ this.addProduct.bind(this) } positive style={ { width: '100%' } }>
              <Icon name='plus' size='large' style={ { margin: 'auto' } } fitted/>
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      );
  }
}

const selector = formValueSelector('productListSegment');
const mapStateToProps = (state) => {
  return {
    dataBinded: state.dataBinded,
    productName: selector(state, 'addProductComponent.productSelection'),
    productAmount: selector(state, 'addProductComponent.productAmount'),
    productList: selector(state, 'productList')
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dataActions: bindActionCreators(actions.dataActions, dispatch),
  }
}


export default connect(mapStateToProps, mapActionsToProps)(AddProductComponent);