import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import MenuHeader from './MenuHeader';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import Database from './Database';
import NotFound from './NotFound';
import Footer from './Footer';
import PropTypes from 'prop-types';

class MainScene extends Component {
  requireAuth(nextState, replace) {
    if (!this.props.isAuth) {
      replace({
        pathname: '/login'
      });
    }
  }

  isLoggedOn(nextState, replace) {
    if (this.props.isAuth) {
      replace({
        pathname: '/dashboard'
      });
    }
  }

  render() {
    return (
      <Dimmer.Dimmable as='div' dimmed={ this.props.webData.loading } blurring style={ { height: '100%' } }>
        <Dimmer active={ this.props.webData.loading }>
          <Loader content='Loading ... do not reload the page' />
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

class ConditionRedirect extends Route {
  render() {
    if (this.props.condition) {
      return (
        <Redirect exact path={ this.props.from } to={ this.props.to } />
        );
    }
    return (
    this.props.else ?
      <Redirect exact path={ this.props.from } to={ { pathname: this.props.else, } } />
      : <div></div>
    );
  }
}

ConditionRedirect.propTypes = {
  else: PropTypes.string,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
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


const mapStateToProps = ({webData}) => ({
  webData
});

export default withRouter(connect(mapStateToProps)(MainScene));