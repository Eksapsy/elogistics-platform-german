import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions'
import { Segment, Form, Header, Divider, Input, Button, Dropdown } from 'semantic-ui-react';
import uuid from 'uuid';

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

  handleSubmit() {
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
    this.props.dataActions.addReceiver(receiver);
    window.location.reload();
  }

  render() {
    const couriers = this.props.dataBinded.couriers.map((courier) => {
      return {
        key: uuid(),
        value: courier.name,
        text: courier.name,
      };
    });

    return (
      <Segment color='blue'>
        <Form onSubmit={ this.handleSubmit }>
          <Divider horizontal>
            <Header block content='ADD RECEIVER' as='h3' />
          </Divider>
          <Form.Group widths='equal'>
            <Form.Field control={ Input } label='ID' placeholder='ID' name='receiverID' onChange={ this.handleChange } required/>
            <Form.Field control={ Input } label='Name' placeholder='Name' name='receiverName' onChange={ this.handleChange } required />
            <Form.Field control={ Dropdown } label='Favourite Courier' placeholder='Courier' name='receiverCourier' fluid selection floating search options={ couriers }
              onChange={ this.handleChange } />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={ Input } label='VAT Number' placeholder='VAT Number' name='receiverVAT' onChange={ this.handleChange } />
            <Form.Field control={ Input } label='DOY Number' placeholder='DOY Number' name='receiverDOY' onChange={ this.handleChange } />
            <Form.Field control={ Input } label='Phone #1' placeholder='Phone #1' name='receiverPhone_1' onChange={ this.handleChange } required/>
            <Form.Field control={ Input } label='Email' placeholder='Email' name='receiverEmail' onChange={ this.handleChange } />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={ Input } label='Phone #2' placeholder='Phone #2' name='receiverPhone_2' onChange={ this.handleChange } />
            <Form.Field control={ Input } label='Location' placeholder='Location' name='receiverLocation' onChange={ this.handleChange } />
            <Form.Field control={ Input } label='Address' placeholder='Address' name='receiverAddress' onChange={ this.handleChange } />
            <Form.Field control={ Input } label='ZIP Code' placeholder='ZIP Code' name='receiverZIP' onChange={ this.handleChange } />
          </Form.Group>
          <center>
            <Form.Field control={ Button } content='Add Receiver' />
          </center>
        </Form>
      </Segment>
      );
  }
}

const mapActionsToProps = (dispatch) => ({
  dataActions: bindActionCreators(actions.dataActions, dispatch)
})

const mapStateToProps = ({dataBinded}) => ({
  dataBinded
});

export default connect(mapStateToProps, mapActionsToProps)(AddReceiverForm);