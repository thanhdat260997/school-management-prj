import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

export class AuthRoute extends Component {
  render() {
    const Comp = this.props.component;
    if (localStorage.getItem('token')) {
      return (<Comp {...this.props} />);
    }
    return (<Redirect to={{ pathname: '/signin' }} />);
  }
}

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  pageStatus: PropTypes.string
};

AuthRoute.defaultProps = {
  pageStatus: '',
};

function mapStateToProps(state) {
  return {
    pageStatus: state.auth.pageStatus
  };
}

export default withRouter(connect(mapStateToProps, null)(AuthRoute));
