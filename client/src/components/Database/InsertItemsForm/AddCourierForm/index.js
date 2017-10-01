import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions'
import { Segment, Form, Header, Divider, Input, Button } from 'semantic-ui-react';

class AddCourierForm extends Component {
  state = {
    courierName: ''
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(e, {name, value}) {
    this.setState({
      [name]: value
    });
  // await this.props.formData.changeCourier(value);
  }

  async handleSubmit() {
    const {courierName} = this.state;
    await this.props.dataActions.addCourier(courierName);
    await window.location.reload();
  }

  render() {
    return (
      <Segment color='blue'>
        <Form onSubmit={ this.handleSubmit }>
          <Divider horizontal>
            <Header block content='ADD COURIER' as='h3' />
          </Divider>
          <Form.Group widths='equal'>
            <Form.Field control={ Input } label='Name' placeholder='Name' name='courierName' onChange={ this.handleChange } required />
          </Form.Group>
          <center>
            <Form.Field control={ Button } content='Add Courier' />
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


export default connect(null, mapActionsToProps)(AddCourierForm);