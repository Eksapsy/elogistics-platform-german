import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'
import MenuHeader from './MenuHeader';
import Dashboard from './Dashboard';
import Database from './Database';
import NotFound from './NotFound';
import Footer from './Footer';
import { Container, Segment,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './styles.css';

class App extends Component {
  componentDidMount() {
    // Update emailForm in Redux Store by Fetching data from the API
    this.props.fetchFormData();
  }
  render() {
    return (
      <Container textAlign='justified' style={ { marginTop: '3em', marginBottom: '2em' } }>
        <BrowserRouter>
          <div>
            <MenuHeader/>
            <Segment>
              <Switch>
                <Redirect exact from='/' to='/dashboard' />
                <Redirect exact from='/database' to='/database/insert-items' />
                <Route path='/dashboard' component={ Dashboard } />
                <Route path='/database/insert-items' component={ Database } />
                <Route path='/database/import-by-excel' component={ Database } />
                <Route path='*' component={ NotFound } />
              </Switch>
            </Segment>
            <Footer/>
          </div>
        </BrowserRouter>
      </Container>
      );
  }
}

export default connect(null, actions)(App);