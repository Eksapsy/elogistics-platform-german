import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Header, Divider } from 'semantic-ui-react';

class SenderSegment extends Component {
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
    const {displayName} = this.props.webData.profile;
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
            <Header as='h3' content={ displayName } block/>
          </center>
        </Grid.Column>
      </div>
      );
  }
}

const mapStateToProps = ({dataBinded, webData}) => {
  return {
    webData,
    dataBinded,
  }
};

export default withRouter(connect(mapStateToProps)(SenderSegment));