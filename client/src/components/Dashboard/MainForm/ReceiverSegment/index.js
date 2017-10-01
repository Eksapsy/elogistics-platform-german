import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Header, Icon, Divider, Dropdown } from 'semantic-ui-react';
import uuid from 'uuid';


class ReceiverSegment extends Component {

  receiverAdded(e, data) {}

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
            <Icon name='home' />
            <Header.Content>Receiver</Header.Content>
          </Header>
        </Divider>
        <Grid.Row>
          <Grid.Column width={ 16 }>
            <Dropdown placeholder='Receiver' fluid search selection options={ receiverNames } onChange={ this.receiverAdded.bind(this) } />
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

export default withRouter(connect(mapStateToProps, null)(ReceiverSegment));