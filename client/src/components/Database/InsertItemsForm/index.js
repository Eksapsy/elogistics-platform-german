import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { Form, Segment, Divider, Header, Input, Button } from 'semantic-ui-react';
import AddSenderForm from './AddSenderForm';
import AddReceiverForm from './AddReceiverForm';
import AddCourierForm from './AddCourierForm';
import AddProductForm from './AddProductForm';

class InsertItemsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      <div>
        <Divider horizontal>
          <Header block as='h2' content='Insert Items' />
        </Divider>
        <AddSenderForm/>
        <Divider horizontal section/>
        <AddReceiverForm/>
        <Divider horizontal section/>
        <AddCourierForm/>
        <Divider horizontal section/>
        <AddProductForm/>
      </div>
      );
  }
}

export default InsertItemsForm;