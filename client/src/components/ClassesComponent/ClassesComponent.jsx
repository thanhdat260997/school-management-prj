import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';


export class ClassesComponent extends Component {

    render() {

        return (
           <h1>Classes</h1>
        );
    }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

const ClassesPage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassesComponent));

export default ClassesPage;

