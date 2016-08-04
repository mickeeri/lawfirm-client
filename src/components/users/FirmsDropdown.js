import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFirms } from '../../actions/index';
import '../../styles/dropdown.css';

class FirmsDropdown extends Component {
  componentWillMount() {
    this.props.fetchFirms();
  }

  render() {
    let dropdown;
    const { firms, onDropdownChange } = this.props;
    return (
      <div>
        <label>Firma</label>
        <select
          name="firms"
          className="ui normal dropdown"
          defaultValue="0"
          ref={node => { dropdown = node; }}
          onChange={(e) => {
            dropdown.value = e.target.value;
            onDropdownChange(e.target.value);
          }}
          required
        >
          <option value="0">Välj en firma</option>
          {firms.map(firm =>
            <option
              value={firm.id}
              key={firm.id}
            >{firm.name}</option>
          )}
        </select>
      </div>
    );
  }
}

FirmsDropdown.propTypes = {
  firms: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onDropdownChange: PropTypes.func.isRequired,
  fetchFirms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => (
  { firms: state.firm.all }
);

export default connect(mapStateToProps, { fetchFirms })(FirmsDropdown);
