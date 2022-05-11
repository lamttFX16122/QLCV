import React, { Component } from "react";
import * as action from "./../actions/index";
import { connect } from "react-redux";

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {
        by: "name",
        val: 1,
      },
    };
  }
  // componentWillReceiveProps(nextProps){
  //   console.log(nextProps)
  // }
  onSort = (sortBy, valSort) => {
    this.setState(
      {
        sort: {
          by: sortBy,
          val: valSort,
        },
      },
      () => {
        this.props.onSort(this.state.sort);
      }
    );
  };
  render() {
    const { sort } = this.state;
    return (
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-info dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sắp xếp
        </button>

        <ul className="dropdown-menu">
          <li className="dropdown-item" onClick={() => this.onSort("name", 1)}>
            <a
              href="#"
              className={
                sort.by === "name" && sort.val === 1 ? "sort_selected" : ""
              }
            >
              <span>
                <i className="fa-solid fa-arrow-down-a-z ico"></i> Tên A-Z
              </span>
            </a>
          </li>
          <li className="dropdown-item" onClick={() => this.onSort("name", -1)}>
            <a
              href="#"
              className={
                sort.by === "name" && sort.val === -1 ? "sort_selected" : ""
              }
            >
              <span>
                <i className="fa-solid fa-arrow-down-z-a ico"></i> Tên Z-A
              </span>
            </a>
          </li>
          <div className="dropdown-divider"></div>
          <li
            className="dropdown-item"
            onClick={() => this.onSort("status", 1)}
          >
            <a
              href="#"
              className={
                sort.by === "status" && sort.val === 1 ? "sort_selected" : ""
              }
            >
              Trạng thái kích hoạt
            </a>
          </li>
          <li
            className="dropdown-item"
            onClick={() => this.onSort("status", -1)}
          >
            <a
              href="#"
              className={
                sort.by === "status" && sort.val === -1 ? "sort_selected" : ""
              }
            >
              Trạng thái ẩn
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
  };
}
const mapDispatchToProps=(dispatch, props)=>{
  return {
    onSort: (sort)=>{
      dispatch(action.sort(sort));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sort);


