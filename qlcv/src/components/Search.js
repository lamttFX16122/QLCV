import React, { Component } from "react";
import * as action from "./../actions/index";
import { connect } from "react-redux";
class Search extends Component {
  constructor(props) {
  	super(props);
    this.state={
      keyWord:''
    }
  }
  onChange=(e)=>
  {
    const target=e.target;
    const name=target.name;
    const value=target.value;
    this.setState({
      [name]:value
    })
  }
  onSearch=()=>{
    this.props.onSearch(this.state.keyWord);
  }
  render() {
    const {keyWord} =this.state;
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập từ khóa.."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name="keyWord"
          value={keyWord}
          onChange={this.onChange}
        />
        <div className="input-group-append">
          <button className="btn btn-info" type="button" onClick={this.onSearch}>
            <i className="fa-solid fa-magnifying-glass"></i> Tìm
          </button>
        </div>
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
    onSearch: (keyWord)=>{
      dispatch(action.search(keyWord));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);


