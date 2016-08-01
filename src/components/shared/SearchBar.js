import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClients } from '../../actions';

class SearchBar extends Component {
  render() {
    const { onSearch } = this.props;
    return (
      <div className="ui icon input">
        <input name="search" type="text" placeholder="Sök" onChange={(e) => onSearch(e.target.value)} />
        <i className="search icon" />
      </div>
    );
  }
}

export default SearchBar;
