import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Dimmer, Loader, Modal, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MenuHeader from './MenuHeader';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import Database from './Database';
import NotFound from './NotFound';
import Footer from './Footer';
import * as actions from '../actions'

class MainScene extends Component {
  requireAuth(nextState, replace) {
    if (!this.props.isAuth) {
      replace({
        pathname: '/login'
      });
    }
  }

  componentWillUpdate() {
    if (this.props.isAuth) {
      this.props.dataActions.fetchFormData();
    }
  }

  render() {
    return (
      <Dimmer.Dimmable as='div' dimmed={ this.props.webData.loading } blurring style={ { height: '100%' } }>
        <Dimmer active={ this.props.webData.loading }>
          <Loader content='Loading ... do not reload the page' />
        </Dimmer>
        <Dimmer active={ this.props.webData.error.show }>
          <Modal open={ this.props.webData.error.show }>
            <Modal.Header color='red'>Error Occured</Modal.Header>
            <Modal.Content>
              <p>
                { this.props.webData.error.message }
              </p>
            </Modal.Content>
            <Modal.Actions>
              { this.props.webData.error.reload ?
                <Button onClick={ () => {
                                    this.props.webActions.cleanError();
                                    window.location.reload();
                                  } }>Reload Page</Button>
                : <Button onClick={ () => {
                                    this.props.webActions.cleanError();
                                  } }>
                    Close
                  </Button> }
            </Modal.Actions>
          </Modal>
        </Dimmer>
        <MenuHeader isAuth={ this.props.isAuth } />
        <Switch>
          <Route exact path="/" render={ () => (
                                         this.props.isAuth ? (
                                           <Redirect to="/dashboard" />
                                           ) : (
                                           <Redirect to="/login" />
                                           )
                                         ) } />
          <PrivateRoute path='/dashboard' component={ Dashboard } isAuth={ this.props.isAuth } />
          <PrivateRoute path='/database/insert-items' component={ Database } isAuth={ this.props.isAuth } />
          <PrivateRoute path='/database/import-by-excel' component={ Database } isAuth={ this.props.isAuth } />
          <Redirect exact from='/database' to='/database/insert-items' />
          <Route exact path='/login' render={ () => (
                                              this.props.isAuth ? (
                                                <Redirect to="/dashboard" />
                                                ) : (
                                                <LoginForm/>
                                                )
                                              ) } />
          <PrivateRoute path='*' component={ NotFound } isAuth={ this.props.isAuth } />
        </Switch>
        <Footer isAuth={ this.props.isAuth } />
      </Dimmer.Dimmable>
      );
  }
}

class PrivateRoute extends Route {
  render() {
    if (this.props.isAuth) {
      return (
        <Route path={ this.props.path } component={ this.props.component } />
        );
    }
    return (
      <Redirect to={ { pathname: '/login' } } />
      );
  }
}

const mapDispatchToProps = (dispatch) => ({
  webActions: bindActionCreators(actions.webActions, dispatch),
  dataActions: bindActionCreators(actions.dataActions, dispatch)
});

const mapStateToProps = ({webData}) => ({
  webData
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainScene));