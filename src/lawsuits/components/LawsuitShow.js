import React, { Component, PropTypes } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import LawsuitInfo from './LawsuitInfo';

class LawsuitShow extends Component {
  componentWillMount() {
    this.props.fetchLawsuits({ filter: {}, id: this.props.params.id });
  }

  render() {
    const { lawsuit } = this.props;

    return (
      <div className="ui stackable grid">
        <div className="two column row">
          <div className="column ui segment">
            <LawsuitInfo lawsuit={lawsuit} />
          </div>
          <div className="column">
            <div className="ui segment">
              <h2 className="ui header">Klient/Klienter</h2>
            </div>
            <div className="ui segment">
              <h2 className="ui header">Mortpart/Motparter</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LawsuitShow.propTypes = {
  lawsuit: PropTypes.object,
}

const mapStateToProps = (state) => (
 { lawsuit: state.lawsuits.lawsuit }
);

export default connect(mapStateToProps, actions)(LawsuitShow);
