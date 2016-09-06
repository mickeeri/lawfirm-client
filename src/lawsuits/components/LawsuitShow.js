import { connect } from 'react-redux';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import { Icon } from 'react-fa';

import { LAWSUITS_PATH } from '../constants';
import { TASKS_PATH } from '../../tasks/constants';
import { fetchLawsuits, resetLawsuits } from '../actions';

class LawsuitShow extends Component {
  componentWillMount() {
    this.props.fetchLawsuits({ filter: {}, id: this.props.params.id });
  }

  componentWillUnmount() {
    this.props.resetLawsuits();
  }

  render() {
    const { lawsuit, children, location } = this.props;

    if (!lawsuit) {
      return <div className="ui big active centered inline loader" />;
    }

    return (
      <div className={`lawsuit-show ${lawsuit.closed ? 'archived' : ''}`}>
        <h2>Ärende {lawsuit.slug}</h2>
        { lawsuit.closed &&
          <span className="archived-icon"><Icon name="archive" />Arkiverat</span>
        }
        <div className="tabbed-area">
          <ul className="tabs group">
            <li>
              <Link
                className={location.pathname === `${LAWSUITS_PATH}/${lawsuit.id}` ? 'active' : ''}
                to={`${LAWSUITS_PATH}/${lawsuit.id}`}
              >
                Översikt
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to={`${LAWSUITS_PATH}/${lawsuit.id}${TASKS_PATH}`}>
                Arbete
              </Link>
            </li>
            <li><a>Utlägg</a></li>
          </ul>
          <div className="tabbed segment">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

LawsuitShow.propTypes = {
  lawsuit: PropTypes.object,
  fetchLawsuits: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  resetLawsuits: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  lawsuit: state.lawsuits.lawsuit,
});

export default connect(mapStateToProps, { fetchLawsuits, resetLawsuits })(LawsuitShow);
