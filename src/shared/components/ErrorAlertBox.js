import React, { PropTypes } from 'react';
import Icon from 'react-fa';

const ErrorAlertBox = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }

  return (
    <div className="error-alert-box">
      <Icon name="exclamation-circle" />
      {errorMessage}
    </div>
  );
};

ErrorAlertBox.propTypes = {
  errorMessage: PropTypes.string,
};

export default ErrorAlertBox;
