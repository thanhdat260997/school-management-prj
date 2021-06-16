import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Grid, Col, Row, Panel, ButtonToolbar, Button, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from '../NavigationBar/NavigationBar';
import * as authActionCreator from '../../actionCreators/authActionCreator';

export class SignInComponent extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  login() {
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    const { error, message } = this.props;

    let notification = '';
    if (error) {
      notification = (<Alert bsStyle="danger"><p>{error}</p></Alert>);
    } else if (message) {
      notification = (<Alert bsStyle="info"><p>{message}</p></Alert>);
    }

    return (
      <Grid>
        <Row>
          <Col>
            <NavigationBar />
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={6} xsOffset={3} style={{ marginTop: '100px', marginLeft: 'calc(50% - 300px)', width: '600px' }}>
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">Sign In</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <form>
                  <FormGroup controlId="username">
                    <ControlLabel>Username</ControlLabel>
                    <FormControl type="email" ref="username" label="Username" placeholder="Username" onChange={this.handleChange} />
                  </FormGroup>
                  <FormGroup controlId="password">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl type="password" ref="password" label="Password" placeholder="Password" onChange={this.handleChange} />
                  </FormGroup>
                </form>
                {notification}
                <ButtonToolbar>
                  <Button bsStyle="primary" onClick={() => this.login()}>Login</Button>
                </ButtonToolbar>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

SignInComponent.propTypes = {
  login: PropTypes.func.isRequired,
  clearNotification: PropTypes.func,
  history: PropTypes.object,
  message: PropTypes.string,
  error: PropTypes.string
};

SignInComponent.defaultProps = {
  clearNotification: () => {},
  message: '',
  error: '',
  history: null
};

const mapStateToProps = (state) => {
  return {
    pageStatus: state.auth.pageStatus,
    message: state.auth.message,
    error: state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: authActionCreator.login,
    clearNotification: authActionCreator.clearNotification
  }, dispatch);
};

const SignInPage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInComponent));

export default SignInPage;

