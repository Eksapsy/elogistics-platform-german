import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import MenuHeader from './MenuHeader';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import Database from './Database';
import NotFound from './NotFound';
import Footer from './Footer';

class MainScene extends Component {
  render() {
    console.log('isAuth:', this.props.isAuth);
    return (
    this.props.isAuth
      ? <div className='main-scene'>
          <Dimmer.Dimmable as='div' dimmed={ this.props.webData.loading } blurring>
            <Dimmer active={ this.props.webData.loading }>
              <Loader content='Loading ... do not reload the page' />
            </Dimmer>
            <Container textAlign='justified' style={ { marginTop: '3em', marginBottom: '2em' } }>
              <MenuHeader/>
              <Switch>
                <Redirect exact from='/' to='/dashboard' />
                <Redirect exact from='/login' to='/dashboard' />
                <Redirect exact from='/database' to='/database/insert-items' />
                <Route path='/dashboard' component={ Dashboard } />
                <Route path='/database/insert-items' component={ Database } />
                <Route path='/database/import-by-excel' component={ Database } />
                <Route path='*' component={ NotFound } />
              </Switch>
              <Footer/>
            </Container>
          </Dimmer.Dimmable>
        </div>
      :
      <Switch>
        <Route exact path='/login' component={ LoginForm } />
        <Redirect from='/*' to='/login' />
      </Switch>

    );
  }
}

const mapStateToProps = ({webData}) => ({
  webData
});

export default withRouter(connect(mapStateToProps)(MainScene));