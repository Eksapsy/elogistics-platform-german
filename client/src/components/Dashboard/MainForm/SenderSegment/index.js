import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Dropdown, Header, Icon, Divider } from 'semantic-ui-react';
import uuid from 'uuid';
import * as actions from '../../../../actions';

class SenderSegment extends Component {

  senderChanged(e, data) {
    this.props.formDataActions.changeSender(data.value);
  }

  render() {
    const senderNames = this.props.dataBinded.senders.map((sender) => {
      return {
        key: uuid(),
        value: sender.name,
        text: sender.name
      };
    });
    return (
      <div>
        <Divider hidden/>
        <Divider/>
        <Divider horizontal>
          <Header block textAlign='center' as='h3' color='blue'>
            <Icon name='mail forward' />
            <Header.Content>Sender</Header.Content>
          </Header>
        </Divider>
        <Grid.Column width={ 16 }>
          <Dropdown placeholder='Sender' fluid search selection options={ senderNames } onChange={ this.senderChanged.bind(this) } />
        </Grid.Column>
      </div>
      );
  }
}

const mapStateToProps = ({dataBinded, emailForm}) => {
  return {
    dataBinded,
    emailForm,
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    formDataActions: bindActionCreators(actions.formDataActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(SenderSegment));