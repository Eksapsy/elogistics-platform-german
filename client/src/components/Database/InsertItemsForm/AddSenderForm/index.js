import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions'
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';

class AddSenderForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    window.location.replace('/auth/google');
  }

  render() {
    return (
      <Segment color='blue'>
        <Form onSubmit={ this.handleSubmit }>
          <Divider horizontal>
            <Header block content='ADD SENDER' as='h3' />
          </Divider>
          <center>
            <Form.Field control={ Button } content='Login Google' color='orange' inverted/>
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


export default connect(null, mapActionsToProps)(AddSenderForm);