import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import _ from 'lodash';

const SearchBar = ({ onSearch, label }) => {
  let input;

  // Delay search request.
  const handleOnSearch = _.debounce((query) => {
    onSearch(query);
  }, 300);

  return (
    <div className="SearchBar">
      <label htmlFor="search">{label}</label>
      <div className="icon-input-right">
        <input
          name="search"
          type="text"
          placeholder="Ange sökterm"
          onChange={e => {
            handleOnSearch(e.target.value);
          }}
          ref={node => { input = node; }}
        />
        <Icon
          name="times"
          onClick={() => {
            // Click reset button to clear input field,
            // and send empty query.
            input.value = '';
            onSearch('');
          }}
        />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default SearchBar;
