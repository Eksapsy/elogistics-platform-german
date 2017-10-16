import React, { Component } from 'react';
import { Divider, Header } from 'semantic-ui-react';
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