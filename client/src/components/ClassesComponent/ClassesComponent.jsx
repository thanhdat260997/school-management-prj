import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import api from '../../utils/api';


export class ClassesComponent extends Component {

    constructor(props){
        super(props);
        this.state={
            classes : [],
            showEditClassModal: false,
        }
    }

    componentDidMount () {
      this.getClassList();
    }
  
    async getClassList () {
      let x = await api.getClassList();
      this.setState({ classes: x});
    }

    async deleteClass (id) {
      await api.deleteClass(id);
      this.getClassList();
    }

    render() {
      return (
        <div>
            {this.state.classes.map(c =>
              <div className="class-element">
                <span className="glyphicon glyphicon-trash pull-right" style={{ margin: '5px', color: 'blue' }} onClick={() => this.deleteClass(c._id)}></span>
                <span className="glyphicon glyphicon-edit pull-right" style={{ margin: '5px', color: 'blue' }} onClick={() => this.editClass(c)}></span>
                <h2>{c.name}</h2>
                <p><b>Teacher:</b> {c.teacher.name}</p>
                <p><b>Room:</b> {c.room.name}</p>
                <p><b>Start time:</b> {c.startTime}</p>
                <p><b>End time:</b> {c.endTime}</p>
              </div>
            )}
        
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

const ClassesPage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassesComponent));

export default ClassesPage;

