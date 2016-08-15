import React, { PropTypes, Component } from 'react';
import reduxDialog from 'redux-dialog';

class SuccessMessage extends Component {
  componentWillMount() {
    // Close message after a few seconds.
    setTimeout(() => {
      this.props.close();
    }, 2000);
  }

  render() {
    return (
      <div className="SuccessMessage">
        <p>{this.props.message}</p>
      </div>
    );
  }
}

SuccessMessage.propTypes = {
  message: PropTypes.string,
  close: PropTypes.func,
};

export default reduxDialog({
  name: 'successMessage',
  className: 'alert-success',
  overlayClassName: 'alert-success-overlay',
})(SuccessMessage);
