import React, { PropTypes } from 'react';
import _ from 'lodash';

const SearchBar = ({ onSearch }) => {
  let input;

  // Delay search request a little bit.
  const handleOnSearch = _.debounce((query) => {
    onSearch(query);
  }, 300);

  return (
    <div>
      <div className="ui icon input">
        <input
          name="search"
          type="text"
          placeholder="Sök"
          onChange={e => { handleOnSearch(e.target.value); }}
          ref={node => { input = node; }}
        />
        <i className="search icon" />
      </div>
      <button
        className="ui icon button"
        onClick={() => {
          // Click reset button to clear input field,
          // and send empty query.
          input.value = '';
          onSearch('');
        }}
      ><i className="remove icon"></i></button>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
