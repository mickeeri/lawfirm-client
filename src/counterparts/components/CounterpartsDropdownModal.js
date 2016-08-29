import React, { Component, PropTypes } from 'react';
import Icon from 'react-fa';
import { connect } from 'react-redux';
import reduxDialog, { closeDialog } from 'redux-dialog';
import { fetchCounterparts, addCounterpartToLawsuit } from '../actions';
import { COUNTERPARTS_DROPDOWN_MODAL_NAME } from '../constants';

class CounterpartsDropdown extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCounterparts({ filter: {} }));
  }

  render() {
    const { lawsuitId, dispatch, counterparts, errorMessage } = this.props;
    let selectedCounterpartId;

    if (!counterparts) {
      return false;
    }

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addCounterpartToLawsuit(
            { id: parseInt(selectedCounterpartId, 10) },
            lawsuitId
          ));
        }}
      >
        <h2>Välj motpart att lägga till ärendet</h2>
        <select
          name="counterparts"
          ref={node => { selectedCounterpartId = node; }}
          onChange={(e) => {
            selectedCounterpartId = e.target.value;
          }}
        >
          {counterparts.map(counterpart =>
            <option key={counterpart.id} value={counterpart.id}>
                {counterpart.last_name}, {counterpart.first_name} ({counterpart.personal_number})
            </option>
          )}
        </select>
        {errorMessage &&
          <div className="alert-error">
            <p><Icon name="exclamation-circle" />{errorMessage}</p>
          </div>}
        <div className="button-group">
          <button
            className="ui button"
            onClick={(e) => {
              e.preventDefault();
              dispatch(closeDialog(COUNTERPARTS_DROPDOWN_MODAL_NAME));
            }}
          >Avbryt</button>
          <button type="submit" className="ui primary button">Spara</button>
        </div>
      </form>
    );
  }
}

CounterpartsDropdown.propTypes = {
  counterparts: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  lawsuitId: PropTypes.number.isRequired,
};

const CounterpartsDropdownModal = reduxDialog({
  name: COUNTERPARTS_DROPDOWN_MODAL_NAME,
  className: 'modal counterparts-dropdown-modal',
  overlayClassName: 'modal-overlay',
})(CounterpartsDropdown);

const mapStateToProps = (state) => ({
  errorMessage: state.counterparts.errorMessage,
  lawsuitId: state.lawsuits.lawsuit.id,
  counterparts: state.counterparts.all,
});

export default connect(mapStateToProps, null)(CounterpartsDropdownModal);
