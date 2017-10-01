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

  onProductChange(e, data) {
    this.setState({
      productValue: data.value
    });

    this.handleChange();
  }

  onAmountChange(e, data) {
    this.setState({
      amountValue: data.value
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
      if (this.productValue && this.amountValue) {
        this.props.onKeyPress(e, data);
      }
    }
  }

  render() {
    const productNames = this.props.dataBinded.products.map((product) => {
      return {
        key: uuid(),
        value: product.id + '-' + product.name,
        text: product.id + '-' + product.name,
      };
    });

    return (
      <Grid.Column width={ 16 }>
        <Segment color='red'>
          <Grid.Row>
            <Grid.Column width={ 12 } floated='left'>
              <Dropdown placeholder='Product' fluid search selection options={ productNames } size='big' onChange={ this.onProductChange.bind(this) } />
            </Grid.Column>
            <Grid.Column width={ 4 }>
              <InputNumber onChange={ this.onAmountChange.bind(this) } onKeyPress={ this.onKeyPress.bind(this) } minimumValue={ 1 } />
            </Grid.Column>
          </Grid.Row>
        </Segment>
      </Grid.Column>
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