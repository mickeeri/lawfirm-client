import React from 'react';
import { Link } from 'react-router';
import '../styles/welcome.css';
import { PATHS } from '../constants';

const Welcome = () => (
  <div className="ui center aligned segment">
    <div className="ui text container">
      <h1>Välkommen till OrdoCliens</h1>
      <p>OrdoCliens är ett enkelt system för små juristfirmor.</p>
      <Link className="ui huge primary button" to={PATHS.signUp}>Registera mig nu!</Link>
    </div>
  </div>
);

export default Welcome;
