import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { SearchBar } from '../../shared';
import COISearchResult from './COISearchResult';


class COISearch extends Component {

  componentWillUnmount() {
    this.props.resetLawsuits();
  }

  render() {
    const { performCOISearch, lawsuits } = this.props;
    return (
      <div className="COISearch">
        <div className="ui segment index">
          <h1 className="ui header">Jävskontroll</h1>
          <p>Hitta klienter och motparter som har varit inblandade i ärenden hos din firma</p>
          <div className="ui stackable grid">
            <div className="six wide column">
              <SearchBar
                label="Ange ett namn eller personnummer"
                onSearch={(query) => performCOISearch({ query })}
              />
            </div>
          </div>
          <div>
            <div className="ui divider" />
            <h3 className="ui header">Sökresultat</h3>
            {lawsuits ? <COISearchResult lawsuits={lawsuits} /> : ''}
          </div>
        </div>
      </div>
    );
  }
}

COISearch.propTypes = {
  performCOISearch: PropTypes.func.isRequired,
  lawsuits: PropTypes.array,
  resetLawsuits: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => (
  { lawsuits: state.lawsuits.all }
);

export default connect(mapStateToProps, actions)(COISearch);
