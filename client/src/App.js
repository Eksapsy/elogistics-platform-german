import React, { Component } from 'react';
import MainScene from './scenes/MainScene';
import Footer from './components/Footer';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainScene/>
        {/* <Footer/> */}
      </div>
    );
  }
}

export default App;
