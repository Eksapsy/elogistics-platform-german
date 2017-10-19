import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions'
import { Segment, Form, Header, Divider, Input, Button } from 'semantic-ui-react';

class AddReceiverForm extends Component {
  state = {
    receiverName: '',
    receiverEmail: '',
    receiverCourier: ''
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
    const {receiverName, receiverEmail, receiverCourier} = this.state;
    await this.props.dataActions.addReceiver(receiverName, receiverEmail, receiverCourier);
    await window.location.reload();
  }

  render() {
    return (
      <Segment color='blue'>
        <Form onSubmit={ this.handleSubmit }>
          <Divider horizontal>
            <Header block content='ADD RECEIVER' as='h3' />
          </Divider>
          <Form.Group widths='equal'>
            <Form.Field control={ Input } label='Name' placeholder='Name' name='receiverName' onChange={ this.handleChange } required />
            <Form.Field control={ Input } label='Email' placeholder='Email' name='receiverEmail' onChange={ this.handleChange } required />
            <Form.Field control={ Input } label='Favourite Courier' placeholder='Courier' name='receiverCourier' onChange={ this.handleChange } />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={ Input } label='VAT Number' placeholder='Email' name='receiverEmail' onChange={ this.handleChange } />
            <Form.Field control={ Input } label='Phone #1' placeholder='Email' name='receiverEmail' onChange={ this.handleChange } />
            <Form.Field control={ Input } label='Phone #2' placeholder='Email' name='receiverEmail' onChange={ this.handleChange } />
          </Form.Group>
          <center>
            <Form.Field control={ Button } content='Add Receiver' />
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

export default connect(null, mapActionsToProps)(AddReceiverForm);