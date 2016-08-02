import React, { Component, PropTypes } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import LawsuitInfo from './LawsuitInfo';

class LawsuitShow extends Component {
  componentWillMount() {
    this.props.fetchLawsuit(this.props.params.id);
  }

  render() {
    const { lawsuit } = this.props;

    if (!lawsuit) {
      return <div className="ui huge active centered inline loader"></div>;
    }

    return (
      <div className="ui stackable grid">
        <div className="two column row">
          <div className="column">
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

// LawsuitShow.propTypes = {
//   lawsuit: PropTypes.shape({

//   }),
//   fetchLawsuit: PropTypes.func.isRequired,
//   params: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => (
 { lawsuit: state.lawsuits.lawsuit }
);

export default connect(mapStateToProps, actions)(LawsuitShow);
