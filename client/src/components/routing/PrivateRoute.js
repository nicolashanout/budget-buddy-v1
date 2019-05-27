import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../layout/Loading';

const PrivateRoute = props => {
  const { component: Component, auth, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.loading) {
          if (!auth.isAuthenticated) {
            return <Redirect to='/login' />;
          } else {
            return <Component {...props} />;
          }
        } else {
          return <Loading />;
        }
      }}
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
