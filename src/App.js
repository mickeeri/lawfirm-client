import React, { PropTypes } from 'react';
import 'semantic-ui-table/table.css';
import 'semantic-ui-divider/divider.css';
import 'semantic-ui-loader/loader.css';
import './shared/styles/modal.css';
import './shared/styles/header.css';
import Header from './shared/components/Header';
import AlertMessage from './shared/components/AlertMessage';
import ModalRoot from './modals/components/ModalRoot';

const App = (props) =>
  <div className="App">
    <header className="header">
      <Header location={props.location} />
    </header>
    <main>
      <div className="content">
        <AlertMessage />
        {props.children}
      </div>
    </main>
    <ModalRoot />
  </div>;

App.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node,
};

export default App;
