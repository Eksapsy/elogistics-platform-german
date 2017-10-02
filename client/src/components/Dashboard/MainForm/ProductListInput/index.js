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
      amount: Number.parseInt(data.amountValue)
    });
    this.props.formDataActions.changeProducts(newProducts);
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

  updateAmount(e, data) {}

  renderList() {
    const productNames = this.props.dataBinded.products.map((product) => {
      return {
        key: uuid(),
        value: this.getProductFullname(product),
        text: this.getProductFullname(product)
      };
    });

    let ui_items = [];
    const {products} = this.props.emailForm;
    for (let i = 0; i < this.props.emailForm.products.length; i++) {
      const productName = products[i].name;
      const productAmount = products[i].amount;
      ui_items.push(
        <li key={ i }>
          <Grid>
            <Grid.Row>
              <Grid.Column width={ 2 }>
                <Header content={ productName.substring(0, 3) + ' ' + productName.substring(4, 8) } textAlign='center' size='large' block style={ { transform: 'rotate(-60deg)', webkitTransform: 'rotate(-60deg)', width: '64px' } } floated='left' />
              </Grid.Column>
              <Grid.Column width={ 8 }>
                <Segment color='blue'>
                  <Dropdown key={ i } placeholder='Product' value={ productName } fluid search selection options={ productNames } size='big' />
                </Segment>
              </Grid.Column>
              <Grid.Column width={ 6 }>
                <Segment color='blue'>
                  <InputNumber value={ productAmount } key={ i } onChange={ this.updateAmount.bind(this) } />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
        </li>
      );
    }

    return ui_items;
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
                <Icon name='shop' />
                <Header.Content>Products</Header.Content>
              </Header>
            </Divider>
          </Grid.Row>
          <Grid.Row width={ 16 }>
            <ul style={ { listStyle: 'none' } }>
              { this.renderList() }
            </ul>
          </Grid.Row>
          <Grid.Row width={ 16 }>
            <AddProductComponent onKeyPress={ this.handleKeyPressOnAddComponent.bind(this) } onFilled={ this.addProductItem.bind(this) } filterProducts={ this.filteredProductsForAddComponent.bind(this) } />
          </Grid.Row>
        </Grid>
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