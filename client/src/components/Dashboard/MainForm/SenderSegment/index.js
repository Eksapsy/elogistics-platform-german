import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Header, Divider } from 'semantic-ui-react';
import uuid from 'uuid';

class SenderSegment extends Component {

  senders =[
    {
      key: uuid(),
      value: 'Γερμανός Ποιμενίδης',
      text: 'Γερμανός Ποιμενίδης'
    },
    {
      key: uuid(),
      value: 'Θεσσαλονίκη Supplies',
      text: 'Θεσσαλονίκη Supplies'
    }
  ];

  senderChanged(e, data) {
    this.props.formDataActions.changeSender(data.value);
  }

  render() {
    // const senderNames = this.props.dataBinded.senders.map((sender) => {
    //   return {
    //     key: uuid(),
    //     value: sender.name,
    //     text: sender.name
    //   };
    // });
    return (
      <div>
        <Divider hidden/>
        <Divider/>
        <Divider horizontal>
          <Header block textAlign='center' as='h3' color='blue'>
            <Header.Content>Sender</Header.Content>
          </Header>
        </Divider>
        <Grid.Column width={ 16 }>
          <center>
            <Header as='h3' content='Γερμανός Ποιμενίδης' block/>
          </center>
        </Grid.Column>
      </div>
      );
  }
}

const mapStateToProps = ({dataBinded}) => {
  return {
    dataBinded,
  }
};

export default withRouter(connect(mapStateToProps)(SenderSegment));