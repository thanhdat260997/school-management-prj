import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import api from '../../utils/api';
import History from '../../utils/history'


export class TestComponent extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
          username: 'u',
          password: 'a',
          error: ''
        };
      }

    login () {
        console.log("login");
        console.log(this.state.username);
        console.log(this.state.password);
        api.login(this.state.username, this.state.password)
            .then((rs) => {
                if (rs.error) {
                    console.log("err", rs.error);
                    this.setState({ error: rs.error });
                } else {
                    this.setState({ error: '' });
                    console.log("rs", rs);
                    localStorage.setItem('token', rs.token); // hàm lưu token vào trình duyệt để nhớ đăng nhập
                    if (rs.isAdmin) History.push('/classes');
                    else History.push('/teachers');
                }
            });
    }
    render() {

        return (
            <div className="container">
                {this.state.error && <div style={{color: 'red'}}>{this.state.error}</div>}
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Login via site</h3>
                            </div>
                            <div className="panel-body">
                                <form accept-charset="UTF-8" role="form">
                                <fieldset>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="yourmail@example.com" name="email" type="text" value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Password" name="password" type="password"  value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                                    </div>
                                    <Button bsStyle="primary" onClick={() => this.login()}>Login</Button>
                                </fieldset>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

const TestPage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent));

export default TestPage;

