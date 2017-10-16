import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Segment, Divider, Header, Icon, Dropdown } from 'semantic-ui-react';
import * as actions from '../../../../actions';
import uuid from 'uuid';
import AddProductComponent from './AddProductComponent';
import InputNumber from './InputNumber';
import _ from 'lodash';
import './styles.css'

class ProductListInput extends Component {

  addProductItem(data) {
    const {products: lastProducts} = this.props.emailForm;
    const newProducts = lastProducts.concat({
      name: data.productValue,
      amount: Number.parseInt(data.amountValue, 10)
    });
    this.props.formDataActions.changeProducts(newProducts);
  }

  onItemChanged(e, data) {
    this.props.formDataActions.changeProducts(data);
  }

  getProductFullname(product) {
    return product.id + '-' + product.name;
  }

  handleKeyPressOnAddComponent(e, data) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.addProductItem(data);
    }
  }

  filteredProductsForAddComponent(products) {
    return products.filter((product) => {
      return !_.includes(this.props.emailForm.products, {
        name: product.text
      });
    });
  }

  render() {
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
            <ProductList formProducts={ this.props.emailForm.products } bindedProducts={ this.props.dataBinded.products } onChange={ this.onItemChanged.bind(this) } />
          </Grid.Row>
          <Grid.Row width={ 16 }>
            <AddProductComponent onKeyPress={ this.handleKeyPressOnAddComponent.bind(this) } onFilled={ this.addProductItem.bind(this) } filterProducts={ this.filteredProductsForAddComponent.bind(this) } />
          </Grid.Row>
        </Grid>
      </div>
      );
  }
}

class ProductList extends Component {
  renderList() {

    const {formProducts, bindedProducts} = this.props;
    console.log('====================================');
    console.log('ProductList()');
    console.log(formProducts);
    console.log('====================================');
    return formProducts.map((product) => {
      return (
        <li key={ uuid() }>
          <ProductItem productName={ product.name } productAmount={ product.amount } data={ bindedProducts } onChange={ this.onProductChange.bind(this) } />
        </li>
        );
    });
  }

  onListChange(e, data) {}

  onProductChange(e, data) {
    console.log('====================================');
    console.log('OnProductChange()');
    console.log(e);
    console.log(data);
    console.log('====================================');
  //this.props.onChange(e, data);
  }

  render() {
    const list_ui = this.renderList();
    const {formProducts, bindedProducts} = this.props;
    return (
      <div>
        { list_ui.length > 0 ?
          <ul style={ { listStyle: 'none' } }>
            { this.renderList() }
          </ul> :
          null }
      </div>
    )
  }
}

class ProductItem extends Component {

  getProductFullname(product) {
    return product.id + '-' + product.name;
  }

  onProductAmountChange(e) {
    this.props.onChange(e, {
      name: this.props.productName,
      amount: e.target.value
    })
  }

  onProductNameChange(e) {
    console.log('====================================');
    console.log('onProductNameChange()');
    console.log(e);
    console.log('====================================');
    this.props.onChange(e, {
      name: e.target.value,
      amount: this.props.productAmount
    })
  }

  render() {
    const productNames = this.props.data.map((product) => {
      return {
        key: uuid(),
        value: this.getProductFullname(product),
        text: this.getProductFullname(product)
      };
    });
    const {productName, productAmount, id} = this.props;

    const itemHeaderStyle = {
      transform: 'rotate(-60deg)',
      WebkitTransform: 'rotate(0deg)',
      width: '64px',
      backgroundColor: '#ffffff',
      borderTop: '8px solid #2980b9'
    };

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={ 2 }>
              <Header content={ productName.substring(0, 3) + ' ' + productName.substring(4, 8) } textAlign='center' size='large' block style={ itemHeaderStyle } floated='left' />
            </Grid.Column>
            <Grid.Column width={ 8 }>
              <Segment color='blue'>
                <Dropdown placeholder='Product' value={ productName } fluid search selection options={ productNames } size='big' onChange={ this.onProductNameChange.bind(this) } />
              </Segment>
            </Grid.Column>
            <Grid.Column width={ 6 }>
              <Segment color='blue'>
                <InputNumber value={ productAmount } minimumValue={ 0 } onChange={ this.onProductAmountChange.bind(this) } />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
      </div>
      );
  }
}


const mapStateToProps = ({dataBinded, emailForm}) => {
  return {
    dataBinded,
    emailForm,
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dataActions: bindActionCreators(actions.dataActions, dispatch),
    formDataActions: bindActionCreators(actions.formDataActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(ProductListInput));