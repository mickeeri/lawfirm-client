import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Header from './layout/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default App;
