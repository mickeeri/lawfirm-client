import React, { Component, PropTypes } from 'react';
import Header from './shared/components/Header';

class App extends Component {
  render() {
    return (
      <div className="App ui container">
        <Header location={this.props.location} />
          {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node,
};

export default App;
