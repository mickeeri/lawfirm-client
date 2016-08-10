import { connect } from 'react-redux';
import { SearchBar, Paginator } from '../../shared';
import { UsersDropdown } from '../../users';
import * as actions from '../actions';
import LawsuitsTable from './LawsuitsTable';
import React, { Component, PropTypes } from 'react';
import StatusCheckbox from './StatusCheckbox';

class LawsuitsIndex extends Component {
  componentWillMount() {
    this.props.fetchLawsuits({ filter: this.props.filter });
  }

  componentWillUnmount() {
    this.props.resetLawsuits();
  }

  render() {
    const { lawsuits, meta, filter, fetchLawsuits } = this.props;

    if (!lawsuits) {
      return (
        <div className="ui segment index">
          <div className="ui huge active centered inline loader" />
        </div>
      );
    }

    return (
      <div className="LawsuitsIndex segment index">
        <h1>Ärenden</h1>
        <div className="index-menu-row">
          <div className="index-menu-column">
            <UsersDropdown
              onDropdownChange={
                (newUserId) => fetchLawsuits({
                  filter: {
                    query: filter.query,
                    status: filter.status,
                    userId: newUserId,
                  },
                })
              }
            />
          </div>
          <div className="index-menu-column">
            <SearchBar
              label="Sök på huvudklient eller ärende"
              onSearch={
                (query) => fetchLawsuits({
                  filter: {
                    query,
                    status: filter.status,
                    userId: filter.userId,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="index-menu-row">
          <div className="index-menu-column">
            <StatusCheckbox
              onCheck={(newFilter) => fetchLawsuits(newFilter)}
              filter={filter}
              meta={meta}
            />
          </div>
          <div className="index-menu-column">
            <Paginator
              meta={meta}
              onPaginate={
                (page) => fetchLawsuits({
                  filter: {
                    page,
                    status: filter.status,
                    userId: filter.userId,
                  },
                })
              }
            />
          </div>
        </div>
        <LawsuitsTable lawsuits={lawsuits} />
      </div>
    );
  }
}

LawsuitsIndex.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchLawsuits: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
  resetLawsuits: PropTypes.func.isRequired,
  lawsuits: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    court: PropTypes.string,
    case_number: PropTypes.string,
    closed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  filter: PropTypes.shape({
    query: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['active', 'all']).isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return (
  { lawsuits: state.lawsuits.all,
    meta: state.lawsuits.meta,
    filter: state.lawsuits.filter }
  );
};

export default connect(mapStateToProps, actions)(LawsuitsIndex);
