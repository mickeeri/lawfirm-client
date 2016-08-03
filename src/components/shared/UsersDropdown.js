import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/index';
import './UsersDropdown.css';

class UsersDropdown extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    let dropdown;
    const { users, selectedUser, onDropdownChange } = this.props;
    return (
      <div>
        <div className="ui sub header">Handläggare</div>
        <select
          name="users"
          className="ui normal dropdown"
          value={selectedUser}
          onChange={(e) => {
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
  }).isRequired).isRequired,
  selectedUser: PropTypes.number.isRequired,
  onDropdownChange: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => (
  { users: state.users.all }
);

export default connect(mapStateToProps, { fetchUsers })(UsersDropdown);
