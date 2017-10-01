import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Segment, Divider, Header, Icon, Dropdown } from 'semantic-ui-react';
import * as actions from '../../../../actions';
import uuid from 'uuid';
import AddProductComponent from './AddProductComponent';
import InputNumber from './InputNumber';
import './styles.css'

class ProductListInput extends Component {

  addProductItem(data) {
    console.log('====================================');
    console.log('added item!');
    console.log('====================================');
  }

  handleKeyPressOnAddComponent(e, data) {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('====================================');
      console.log('event: ', e);
      console.log('data: ', data);
      console.log('====================================');
      this.addProductItem(data);
    }
  }

  renderList() {
    const productNames = this.props.dataBinded.products.map((product) => {
      return {
        key: uuid(),
        value: product.id + '-' + product.name,
        text: product.id + '-' + product.name,
      };
    });

    let ui_items = [];
    const {productList} = this.props.emailForm;
    for (let i = 0; i < this.props.emailForm.productList; i++) {
      const productName = productList[i];
      ui_items.add(
        <Grid.Column width={ 16 }>
          <Segment color='blue'>
            <Grid.Row>
              <Grid.Column width={ 12 }>
                <Dropdown placeholder='Product' value={ productName } fluid search selection options={ productNames } size='big' />
              </Grid.Column>
              <Grid.Column width={ 4 }>
                <InputNumber updateValue={ this.updateAmount.bind(this) } />
              </Grid.Column>
            </Grid.Row>
          </Segment>
        </Grid.Column>
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
          { this.renderList() }
          <AddProductComponent onKeyPress={ this.handleKeyPressOnAddComponent.bind(this) } onFilled={ this.addProductItem.bind(this) } />
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