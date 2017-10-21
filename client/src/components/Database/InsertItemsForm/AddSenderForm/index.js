import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Segment, Divider, Header, Message } from 'semantic-ui-react';
import * as actions from '../../../../actions'

class AddSenderForm extends Component {
  render() {
    return (
      <div>
        <Segment color='blue'>
          <Divider horizontal>
            <Header block as='h3' content='ADD SENDER' />
          </Divider>
          <Message warning header='Not Available' content='This option is not available.' />
        </Segment>
      </div>
      );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dataActions: bindActionCreators(actions.dataActions, dispatch)
});
export default connect(null, mapDispatchToProps)(AddSenderForm);