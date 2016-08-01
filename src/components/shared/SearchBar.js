import React, { PropTypes } from 'react';
import _ from 'lodash';

const SearchBar = ({ onSearch }) => {
  // Delay search request a little bit.
  const handleOnSearch = _.debounce((query) => {
    onSearch(query);
  }, 300);

  return (
    <div className="ui icon input">
      <input
        name="search"
        type="text"
        placeholder="Sök"
        onChange={e => { handleOnSearch(e.target.value); }}
      />
      <i className="search icon" />
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
