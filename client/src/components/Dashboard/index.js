import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Segment, Header, Divider, Icon } from 'semantic-ui-react';
import MainForm from './MainForm/index';
import './styles.css';


class Dashboard extends Component {
  render() {
    return (
      <Container textAlign='justified' style={ { marginTop: '3em', marginBottom: '2em' } }>
        <div>
          <Segment color='teal'>
            <Divider hidden/>
            <Divider horizontal>
              <Header block textAlign='center' as='h1' color='black'>
                <Icon link name='browser' />
                <Header.Content>Fill The Form</Header.Content>
              </Header>
            </Divider>
            <Divider hidden/>
            <MainForm/>
          </Segment>
        </div>
      </Container>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default withRouter(connect(mapStateToProps)(Dashboard));