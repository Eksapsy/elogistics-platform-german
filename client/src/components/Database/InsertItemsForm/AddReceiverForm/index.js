import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions'
import { Segment, Form, Header, Divider, Input, Button } from 'semantic-ui-react';

class AddReceiverForm extends Component {
  state = {
    receiverID: '',
    receiverName: '',
    receiverEmail: '',
    receiverCourier: '',
    receiverVAT: '',
    receiverDOY: '',
    receiverPhone_1: '',
    receiverPhone_2: '',
    receiverLocation: '',
    receiverAddress: '',
    receiverZIP: ''
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
    const {receiverID, receiverName, receiverEmail, receiverCourier, receiverVAT, receiverDOY, receiverPhone_1, receiverPhone_2, receiverLocation, receiverAddress, receiverZIP} = this.state;
    const receiver = {
      r_id: receiverID,
      name: receiverName,
      email: receiverEmail,
      courier: receiverCourier,
      vat_number: receiverVAT,
      doy_number: receiverDOY,
      phone_1: receiverPhone_1,
      phone_2: receiverPhone_2,
      location: receiverLocation,
      address: receiverAddress,
      zip: receiverZIP
    };
    await this.props.dataActions.addReceiver(receiver);
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
            <Form.Field control={ Input } label='Favourite Courier' placeholder='Courier' name='receiverCourier' onChange={ this.handleChange } />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={ Input } label='VAT Number' placeholder='VAT Number' name='receiverVAT' onChange={ this.handleChange } required/>
            <Form.Field control={ Input } label='DOY Number' placeholder='DOY Number' name='receiverDOY' onChange={ this.handleChange } required/>
            <Form.Field control={ Input } label='Phone #1' placeholder='Phone #1' name='receiverPhone_1' onChange={ this.handleChange } required/>
            <Form.Field control={ Input } label='Email' placeholder='Email' name='receiverEmail' onChange={ this.handleChange } />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={ Input } label='Phone #2' placeholder='Phone #2' name='receiverPhone_2' onChange={ this.handleChange } />
            <Form.Field control={ Input } label='Location' placeholder='Location' name='receiverLocation' onChange={ this.handleChange } />
            <Form.Field control={ Input } label='Address' placeholder='Address' name='receiverAddress' onChange={ this.handleChange } />
            <Form.Field control={ Input } label='ZIP Code' placeholder='ZIP Code' name='receiverZIP' onChange={ this.handleChange } />
            <Form.Field control={ Input } label='ID' placeholder='ID' name='receiverID' onChange={ this.handleChange } />
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