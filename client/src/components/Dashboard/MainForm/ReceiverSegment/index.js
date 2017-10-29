import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field } from 'redux-form'
import { Grid, Header, Divider } from 'semantic-ui-react';
import DropdownField from '../DropdownField';
import uuid from 'uuid';

class ReceiverSegment extends Component {

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
            <Field name='receiverName' component={ DropdownField } placeholder='Receiver' data={ receiverNames } />
          </Grid.Column>
        </Grid.Row>
        <Divider hidden/>
        <Divider/>
      </div>
      );
  }
}

const mapStateToProps = ({dataBinded}) => {
  return {
    dataBinded,
  }
};

export default withRouter(connect(mapStateToProps)(ReceiverSegment));