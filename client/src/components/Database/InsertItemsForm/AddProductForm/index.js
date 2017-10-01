import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions'
import { Segment, Form, Header, Divider, Input, Button } from 'semantic-ui-react';

class AddProductForm extends Component {
  state = {
    productCode: '',
    productName: ''
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, {name, value}) {
    this.setState({
      [name]: value
    });
  }

  async handleSubmit() {
    const {productCode, productName} = this.state;
    await this.props.dataActions.addProduct(productCode, productName);
    await window.location.reload();
  }

  render() {
    return (
      <Segment color='blue'>
        <Form onSubmit={ this.handleSubmit }>
          <Divider horizontal>
            <Header block content='ADD PRODUCT' as='h3' />
          </Divider>
          <Form.Group widths='equal'>
            <Form.Field control={ Input } label='Code' placeholder='Code' name='productCode' onChange={ this.handleChange } required />
            <Form.Field control={ Input } label='Name' placeholder='Name' name='productName' onChange={ this.handleChange } required />
          </Form.Group>
          <center>
            <Form.Field control={ Button } content='Add Product' />
          </center>
        </Form>
      </Segment>
      );
  }
}

const mapActionsToProps = (dispatch) => {
  return ({
    dataActions: bindActionCreators(actions.dataActions, dispatch)
  });
};

export default connect(null, mapActionsToProps)(AddProductForm);