import "./App.css";
import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import {connect} from "react-redux";
import * as action from './actions/index';

class App extends Component {

  toggleForm = () => {
    if(this.props.itemediting && this.props.itemediting.id !== '')
    {
      this.props.onOpenForm();
    }
    else{
      this.props.onToggleForm();
    }
    this.props.onEditTask({
      id:'',
      name:'',
      status:false
    });
  };
  
  render() {
    const {isDisplayForm} =this.props;
    const elementFrom = isDisplayForm ? (
      <TaskForm/>
    ) : (
      ""
    );
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mt-3">
            <h2>Quản Lý Công Việc</h2>
            <p>{React.version}</p>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-4" : ""}>
            {/* <!-- Card them cong viec --> */}
            {elementFrom}
          </div>
          <div className={isDisplayForm ? "col-8" : "col-12"}>
            {/* <!-- button them cong viec --> */}
            <div className="row">
              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={this.toggleForm}
                >
                  <i className="fa-solid fa-plus"></i> Thêm công việc
                </button>
              </div>
            </div>
            {/* <!-- Search/Sort --> */}
            <div className="row mt-3">
              {/* Search and sort */}
              <Control onSearch={this.onSearch} onSort={this.onSort}></Control>
              {/* Table */}
              <div className="row w-100">
                <div className="col-12">
                  <TaskList
                    // onFilter={this.onFilter}
                  ></TaskList>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    // Tra ve props cho component ^^
    isDisplayForm: state.displayForm,
    itemediting: state.itemediting
  };
}
const mapDispatchToProps=(dispatch, props)=>{
  return {
    onToggleForm: ()=> {
      dispatch(action.toggleForm())
    },
    onOpenForm:()=>{
      dispatch(action.OpenForm());
    },
    onEditTask:(task)=>{
      dispatch(action.editTask(task));
    }
};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
