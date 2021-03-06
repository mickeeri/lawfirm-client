import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UsersDropdown extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    let dropdown;
    const { users, onDropdownChange, currentUserId } = this.props;

    if (!users) {
      return <div>Laddar användare</div>;
    }

    return (
      <div className="UsersDropdown dropdown">
        <label htmlFor="users">Handläggare</label>
        <select
          name="users"
          className="ui fluid dropdown"
          defaultValue={currentUserId}
          ref={node => { dropdown = node; }}
          onChange={(e) => {
            dropdown.value = e.target.value;
            onDropdownChange(e.target.value);
          }}
          required
        >
          <option value="0">Visa alla</option>
          {users.map(user =>
            <option
              value={user.id}
              key={user.id}
            >{user.full_name}</option>
          )}
        </select>
      </div>
    );
  }
}

UsersDropdown.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
  }).isRequired),
  currentUserId: PropTypes.number,
  onDropdownChange: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users.all,
  currentUserId: state.users.currentUserId,
});

export default connect(mapStateToProps, actions)(UsersDropdown);
