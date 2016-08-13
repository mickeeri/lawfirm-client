import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import LawsuitInfo from './LawsuitInfo';

class LawsuitShow extends Component {
  componentWillMount() {
    this.props.fetchLawsuits({ filter: {}, id: this.props.params.id });
  }

  render() {
    const { lawsuit } = this.props;

    return (
      <div className="show-grid">
        <div className="column">
          <div className="segment">
            <a>Ändra</a>
            <LawsuitInfo lawsuit={lawsuit} />
          </div>
        </div>
        <div className="column">
          <div className="segment">
            <h2>Klient/Klienter</h2>
          </div>
          <div className="segment">
            <h2>Mortpart/Motparter</h2>
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
};

const mapStateToProps = (state) => (
 { lawsuit: state.lawsuits.lawsuit }
);

export default connect(mapStateToProps, actions)(LawsuitShow);
