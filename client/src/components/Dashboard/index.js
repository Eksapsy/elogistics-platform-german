import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header, Divider, Icon } from 'semantic-ui-react';
import MainForm from './MainForm/index';
import './styles.css';


class Dashboard extends Component {
  render() {
    return (
      <div>
        <Divider hidden/>
        <Divider horizontal>
          <Header block textAlign='center' as='h1' color='black'>
            <Icon link name='browser' />
            <Header.Content>Fill The Form</Header.Content>
          </Header>
        </Divider>
        <Divider hidden/>
        <MainForm/>
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default withRouter(connect(mapStateToProps)(Dashboard));