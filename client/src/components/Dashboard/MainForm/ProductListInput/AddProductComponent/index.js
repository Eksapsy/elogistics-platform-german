import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Segment, Dropdown } from 'semantic-ui-react';
import uuid from 'uuid';
import * as actions from '../../../../../actions';
import InputNumber from '../InputNumber';

class AddProductComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productValue: '',
      amountValue: 1
    };
  }

  getProductFullname(product) {
    return product.id + '-' + product.name;
  }

  onProductChange(e, data) {
    this.setState({
      productValue: data.value
    });

    this.handleChange();
  }

  onAmountChange(e) {
    this.setState({
      amountValue: e.target.value
    });
  }

  handleChange() {
    if (this.state.productValue) {

      try {

        this.props.onFilled();
      } catch (e) {
        console.log('Error: ', e.message);
      }
    }
  }

  onKeyPress(e, data) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (typeof this.state.productValue === 'number') {
        this.props.onKeyPress(e, {
          ...this.state
        });
        this.setState({
          productValue: '',
          amountValue: 1
        });
      }
    }
  }

  render() {
    const products = this.props.dataBinded.products.map((product) => {
      return {
        key: uuid(),
        value: this.getProductFullname(product),
        text: this.getProductFullname(product)
      };
    });
    const productNames = this.props.filterProducts(products);

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={ 10 }>
            <Segment color='red' style={ { width: '520px' } }>
              <Dropdown value={ this.state.productValue } placeholder='Product' fluid search selection options={ productNames } size='big' onChange={ this.onProductChange.bind(this) } />
            </Segment>
          </Grid.Column>
          <Grid.Column width={ 6 }>
            <Segment color='red' style={ { width: '280px' } }>
              <InputNumber value={ this.state.amountValue } onChange={ this.onAmountChange.bind(this) } onKeyPress={ this.onKeyPress.bind(this) } minimumValue={ this.state.amountValue } />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      );
  }
}


const mapStateToProps = ({dataBinded, emailForm}) => {
  return {
    dataBinded,
    emailForm
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dataActions: bindActionCreators(actions.dataActions, dispatch),
    formDataActions: bindActionCreators(actions.formDataActions, dispatch)
  }
}


export default withRouter(connect(mapStateToProps, mapActionsToProps)(AddProductComponent));