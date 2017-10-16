import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Header, Icon, Divider, Dropdown } from 'semantic-ui-react';
import uuid from 'uuid';
import * as actions from '../../../../actions';


class ReceiverSegment extends Component {

  receiverChanged(e, data) {
    this.props.formDataActions.changeReceiver(data.value);
  }

  render() {
    const receiverNames = this.props.dataBinded.receivers.map((receiver) => {
      return {
        key: uuid(),
        value: receiver.name,
        text: receiver.name
      };
    });
    return (
      <div>
        <Divider horizontal>
          <Header block textAlign='center' as='h3' color='blue'>
            <Header.Content>Receiver</Header.Content>
          </Header>
        </Divider>
        <Grid.Row>
          <Grid.Column width={ 16 }>
            <Dropdown placeholder='Receiver' fluid search selection options={ receiverNames } onChange={ this.receiverChanged.bind(this) } />
          </Grid.Column>
        </Grid.Row>
        <Divider hidden/>
        <Divider/>
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

export default withRouter(connect(mapStateToProps, mapActionsToProps)(ReceiverSegment));