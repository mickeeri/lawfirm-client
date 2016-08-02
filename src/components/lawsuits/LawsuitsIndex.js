import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchLawsuits } from '../../actions/index';
import '../../styles/table.css';
import SearchBar from '../shared/SearchBar';
import Paginator from '../shared/Paginator';
import LawsuitsTable from './LawsuitsTable';

class LawsuitsIndex extends Component {
  componentWillMount() {
    this.props.fetchLawsuits({ query: '', page: 1 });
  }

  render() {
    let checkbox;
    const { lawsuits, meta, dispatch, filter } = this.props;
    return (
      <div className="ui segment index">
        <h1 className="ui header">Ärenden</h1>
        <SearchBar
          onSearch={
            (query) => dispatch(fetchLawsuits({ query, page: 1 }))
          }
        />
        <Paginator
          meta={meta}
          onPaginate={
            (page) => dispatch(fetchLawsuits({ query: '', page }))
          }
        />
        <label htmlFor="">
          <input
            type="checkbox"
            onChange={() => {
              const status = checkbox.checked ? 'all' : 'only_active';
              dispatch(fetchLawsuits({ status, filter.query }));
            }}
            ref={node => { checkbox = node; }}
          />
          Visa arkiverade ärenden
        </label>
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
};

const mapStateToProps = (state) => {
  return (
  { lawsuits: state.lawsuits.all,
    meta: state.lawsuits.meta,
    filter: state.lawsuits.filter }
  );
};

export default connect(mapStateToProps, { fetchLawsuits })(LawsuitsIndex);
