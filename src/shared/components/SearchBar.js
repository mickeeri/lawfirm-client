import React, { PropTypes } from 'react';
import _ from 'lodash';

const SearchBar = ({ onSearch }) => {
  let input;

  // Delay search request.
  const handleOnSearch = _.debounce((query) => {
    onSearch(query);
  }, 300);

  return (
    <div>
      <label htmlFor="search">Sök på huvudklient eller ärende</label>
      <div className="ui icon fluid input">
        <input
          name="search"
          type="text"
          placeholder="Ange sökterm"
          onChange={e => {
            handleOnSearch(e.target.value);
          }}
          ref={node => { input = node; }}
        />
          <i
            className="ui remove link icon"
            onClick={() => {
              // Click reset button to clear input field,
              // and send empty query.
              input.value = '';
              onSearch('');
            }}
          ></i>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
