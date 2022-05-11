import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";
import * as action from "./../actions/index";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1,
    };
  }
  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    let value = target.value;
    this.props.onFilter({
      name: name === "filterName" ? value : this.state.filterName,
      status: name === "filterStatus" ? value : this.state.filterStatus,
    });

    this.setState({
      [name]: value,
    });
  };
  render() {
    let { tasks, filterTable ,keyword, sort} = this.props;
    const { filterName, filterStatus } = this.state;

    if (filterTable) {
      if (filterTable.name !== "") {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (filterTable.status == -1) {
          return task;
        } else {
          return (task.status===true?1:0) === filterTable.status;
        }
      });
    }
    if(keyword)
    {
      tasks=tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(keyword)!==-1;
      })
    }
    if(sort.by==="name")
        {
          tasks.sort((a,b)=>{
            return a.name.toLowerCase()>b.name.toLowerCase()?sort.val:(a.name.toLowerCase()===b.name.toLowerCase()?0:-sort.val);
          })
        }
        else
        {
          tasks.sort((a,b)=>{
            return a.status>b.status?-sort.val:(a.status===b.status?0:sort.val);
          })
        }
    const renderItem = tasks.map((value, index) => {
      return <TaskItem key={value.id} item={value} index={index}></TaskItem>;
    });
    return (
      <table className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th scope="col">STT</th>
            <th scope="col">Tên</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"></th>
            <td>
              <input
                onChange={this.onChange}
                value={filterName}
                className="form-control form-control-sm"
                type="text"
                name="filterName"
              />
            </td>
            <td>
              <select
                onChange={this.onChange}
                name="filterStatus"
                value={filterStatus}
                className="form-control form-control-sm"
              >
                <option value={-1}>Tất cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích hoạt</option>
              </select>
            </td>
            <td></td>
          </tr>
          {renderItem}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    filterTable: state.filterTable,
    keyword:state.search,
    sort:state.sort
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilter: (filter) => {
      dispatch(action.filterTable(filter));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
