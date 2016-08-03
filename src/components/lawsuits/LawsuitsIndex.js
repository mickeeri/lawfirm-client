import '../../styles/table.css';
import LawsuitsTable from './LawsuitsTable';
import Paginator from '../shared/Paginator';
import React, { Component, PropTypes } from 'react';
import SearchBar from '../shared/SearchBar';
import StatusCheckbox from './StatusCheckbox';
import UsersDropdown from '../shared/UsersDropdown';
import { connect } from 'react-redux';
import { fetchLawsuits } from '../../actions/index';

class LawsuitsIndex extends Component {
  componentWillMount() {
    this.props.fetchLawsuits({ filter: this.props.filter });
  }

  render() {
    const { lawsuits, meta, dispatch, filter } = this.props;

    if (lawsuits.length === 0) {
      return (
        <div className="ui segment index">
          return <div className="ui huge active centered inline loader"></div>
        </div>
      );
    }

    return (
      <div className="ui segment index">
        <h1 className="ui header">Ärenden</h1>
        <SearchBar
          onSearch={
            (query) => dispatch(
              fetchLawsuits({ filter: {
                query, page: 1, status: filter.status, userId: filter.userId,
              } })
            )
          }
        />
        <Paginator
          meta={meta}
          onPaginate={
            (page) => dispatch(
              fetchLawsuits({ filter: {
                query: '', page, status: filter.status, userId: filter.userId,
              } })
            )
          }
        />
        <StatusCheckbox
          onCheck={
            (newFilter) => dispatch(fetchLawsuits(newFilter))
          }
          filter={filter}
          meta={meta}
        />
        <UsersDropdown
          selectedUser={meta.current_user_id}
          onDropdownChange={
            (newUserId) => dispatch(
              fetchLawsuits({ filter: {
                query: filter.query, page: 1, status: filter.status, userId: newUserId,
              } })
            )
          }
        />
        <LawsuitsTable lawsuits={lawsuits} />
      </div>
    );
  }
}

LawsuitsIndex.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchLawsuits: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
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
    status: PropTypes.oneOf(['only_active', 'all']).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return (
  { lawsuits: state.lawsuits.all,
    meta: state.lawsuits.meta,
    filter: state.lawsuits.filter }
  );
};

export default connect(mapStateToProps, { fetchLawsuits })(LawsuitsIndex);
