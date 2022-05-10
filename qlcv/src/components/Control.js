import React, { Component } from "react";
import Search from "./Search";
import Sort from "./Sort";

class Control extends Component {
  render(){
    return (
      <React.Fragment>
        {/* <!-- Search --> */}
        <div className="col-6">
          <Search onSearch={this.props.onSearch}></Search>
        </div>
        {/* <!-- Sort --> */}
        <div className="col-6">
          <Sort onSort={this.props.onSort}></Sort>
        </div>
      </React.Fragment>
    );
  }
};
export default Control;