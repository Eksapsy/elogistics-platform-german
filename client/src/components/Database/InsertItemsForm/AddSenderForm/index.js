import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../actions'
import { Segment, Form, Header, Divider, Input, Button } from 'semantic-ui-react';

class AddSenderForm extends Component {
  state = {
    senderName: '',
    senderEmail: ''
  };

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
    const {senderName, senderEmail} = this.state;
    await this.props.addSender(senderName, senderEmail);
    await window.location.reload();
  }

  render() {
    return (
      <Segment color='blue'>
        <Form onSubmit={ this.handleSubmit }>
          <Divider horizontal>
            <Header block content='ADD SENDER' as='h3' />
          </Divider>
          <Form.Group widths='equal'>
            <Form.Field control={ Input } label='Name' placeholder='Name' name='senderName' onChange={ this.handleChange } required />
            <Form.Field control={ Input } label='Email' placeholder='Email' name='senderEmail' onChange={ this.handleChange } required />
          </Form.Group>
          <center>
            <Form.Field control={ Button } content='Add Sender' />
          </center>
        </Form>
      </Segment>
      );
  }
}

export default connect(null, actions)(AddSenderForm);