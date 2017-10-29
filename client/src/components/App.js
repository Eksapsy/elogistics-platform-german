import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MainScene from './MainScene';
import 'semantic-ui-css/semantic.min.css';
import './styles.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.loggedIn = this.loggedIn.bind(this);
  }
  componentDidMount() {
    // Update dataBinded in Redux Store by Fetching data from the API
    this.props.dataActions.fetchFormData();
  }

  loggedIn() {
    return this.props.webData.isLoggedIn; // Returns either null, true of false
  }

  render() {

    return (
      <div>
        <BrowserRouter>
          <MainScene isAuth={ this.loggedIn() } />
        </BrowserRouter>
      </div>
      );
  }
}

const mapStateToProps = ({webData}) => ({
  webData
});

const mapDispatchToProps = (dispatch) => ({
  dataActions: bindActionCreators(actions.dataActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);