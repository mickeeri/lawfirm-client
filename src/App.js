import React, { PropTypes } from 'react';
import 'semantic-ui-table/table.css';
import 'semantic-ui-button/button.css';
import 'semantic-ui-divider/divider.css';
import './shared/styles/modal.css';
import Header from './shared/components/Header';

const App = (props) =>
  <div className="App">
    <header className="header">
      <Header location={props.location} />
    </header>
    <main>
      <div className="content">
        {props.children}
      </div>
    </main>
  </div>;

App.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node,
};

export default App;
