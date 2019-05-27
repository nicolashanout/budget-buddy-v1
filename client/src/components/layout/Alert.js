import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = props => {
  const { alerts } = props;
  if (alerts !== null && alerts.length > 0) {
    return alerts.map(alert => {
      return (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      );
    });
  } else {
    return <Fragment />;
  }
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return { alerts: state.alert };
};

export default connect(mapStateToProps)(Alert);
