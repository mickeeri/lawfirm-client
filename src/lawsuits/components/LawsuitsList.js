import React, { Component, PropTypes } from 'react';
import Icon from 'react-fa';
import { connect } from 'react-redux';
import { openDialog } from 'redux-dialog';
import { Link } from 'react-router';
import LawsuitFormDialog from './LawsuitFormDialog';
import { LAWSUITS_PATH } from '../constants';
import { fetchLawsuits, resetLawsuits } from '../actions';


class LawsuitsList extends Component {
  componentWillMount() {
    this.props.dispatch(fetchLawsuits({ filter: { clientId: this.props.clientId } }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetLawsuits());
  }

  render() {
    const { lawsuits, dispatch } = this.props;

    if (!lawsuits) {
      return <div className="ui large active centered inline text loader" />;
    }

    return (
      <div className="LawsuitsList">
        <h2>Ärenden</h2>
        <ul className="show-sub-list">
          {lawsuits.map(lawsuit =>
            <li key={lawsuit.id}>
              <Link to={`${LAWSUITS_PATH}/${lawsuit.id}`}>
                {lawsuit.type}, {lawsuit.slug}
              </Link>
            </li>
          )}
        </ul>
        <LawsuitFormDialog />
        <button
          className="ui primary button"
          onClick={() => dispatch(openDialog('lawsuitFormDialog'))}
        >
          <Icon name="plus" />Lägg till ärende
        </button>
      </div>
    );
  }
}

LawsuitsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lawsuits: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
  fetchLawsuits: PropTypes.func,
  clientId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  lawsuits: state.lawsuits.all,
});

export default connect(mapStateToProps, null)(LawsuitsList);
