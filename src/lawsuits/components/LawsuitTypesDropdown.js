import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

class LawsuitTypesDropdown extends Component {
  componentWillMount() {
    this.props.fetchLawsuitTypes();
  }

  render() {
    const { lawsuitTypes } = this.props;

    if (!lawsuitTypes) {
      return false;
    }

    return (
      <div className="LawsuitTypesDropdown">
        <label htmlFor="lawsuit_type_id">Ärendetyp</label>
        <Field
          className="dropdown"
          name="lawsuit_type_id"
          component="select"
          defaultValue="0"
        >
          <option value="0" disabled>Välj ärendetyp</option>
          {lawsuitTypes.map(lt =>
            <option key={lt.id} value={lt.id}>{lt.name}</option>
          )}
        </Field>
      </div>
    );
  }
}

LawsuitTypesDropdown.propTypes = {
  lawsuitTypes: PropTypes.array,
  fetchLawsuitTypes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lawsuitTypes: state.lawsuits.lawsuitTypes,
});

export default connect(mapStateToProps, actions)(LawsuitTypesDropdown);
