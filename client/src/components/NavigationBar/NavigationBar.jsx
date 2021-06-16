import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as authActionCreator from '../../actionCreators/authActionCreator';

export class NavigationBarComponent extends Component {
  render() {
    let dropDown = null;
    if (this.props.user && this.props.user.username) {
      dropDown = (
        <Nav pullRight>
          <Navbar.Brand onClick={(this.props.logout)}>
            <a href="/me">{this.props.user.username}</a>
          </Navbar.Brand>
          <Navbar.Brand style={{ cursor: 'pointer', fontSize: '17px' }} onClick={() => {
            localStorage.removeItem('token')
            return this.props.logout();
            }}>
            Logout
          </Navbar.Brand>
        </Nav>);
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand><p style={{ margin: '0 50px 0 0' }}>SCHOOL MANAGEMENT</p></Navbar.Brand>
          {this.props.user?.isAdmin && <Navbar.Brand>
              <a href="/users">Users</a>
            </Navbar.Brand>
          }
          {this.props.user?.isAdmin && <Navbar.Brand>
              <a href="/classes">Classes</a>
            </Navbar.Brand>
          }
          {this.props.user?.isAdmin && <Navbar.Brand>
              <a href="/rooms">Rooms</a>
            </Navbar.Brand>
          }
          {this.props.user?.isAdmin === false && <Navbar.Brand>
              <a href="/all-classes">Classes</a>
            </Navbar.Brand>
          }
        </Navbar.Header>
        {dropDown}
      </Navbar>
    );
  }
}

NavigationBarComponent.propTypes = {
  logout: PropTypes.func,
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string
  })
};

NavigationBarComponent.defaultProps = {
  logout: () => { },
  user: {}
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    pageStatus: state.auth.pageStatus,
    message: state.auth.message,
    error: state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout: authActionCreator.logout
  }, dispatch);
};

const NavigationBar = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBarComponent));

export default NavigationBar;

