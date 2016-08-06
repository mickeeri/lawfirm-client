import React, { Component } from 'react';
import Header from './shared/components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header location={this.props.location} />
        {this.props.children}
      </div>
    );
  }
}

export default App;
