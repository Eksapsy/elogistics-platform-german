import React, { Component } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import AddReceiverForm from './AddReceiverForm';
import AddCourierForm from './AddCourierForm';
import AddProductForm from './AddProductForm';
import AddSenderForm from './AddSenderForm';

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