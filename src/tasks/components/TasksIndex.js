import React, { Component, PropTypes } from 'react';

class TasksIndex extends Component {
  render() {
    return (
      <div>
        <div>TasksIndex</div>
        {this.props.children}
      </div>
    );
  }
}

export default TasksIndex;
