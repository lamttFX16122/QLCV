import React, { Component } from "react";
import {connect} from "react-redux";
import * as action from "./../actions/index"
class TaskForm extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            id:'',
            name:"",
            status: false
        };
    }
    // componentDidMount
    componentDidMount(){ 
        const {itemediting}=this.props;
      if(itemediting)
      {
        this.setState({
            id:itemediting.id,
            name:itemediting.name,
            status:itemediting.status
        })
      }
    }
    componentWillReceiveProps (nextProps){
        if(nextProps && nextProps.itemediting)
        {
            this.setState({
                id:nextProps.itemediting.id,
                name: nextProps.itemediting.name,
                status: nextProps.itemediting.status
            })
        }else if(nextProps && nextProps.itemediting===null)
        {
            this.setState({
                id:'',
                name:"",
                status: false
            })
        }
    }
  closeForm = () => {
    this.props.onCloseForm();
  };
  onChange=(e)=>
  {
    const target=e.target;
    const name=target.name;
    let value=target.value;
    if(name==="status")
    {
        value=target.value==="true"?true:false
    }
    this.setState({
        [name]:value
    })
  }
  onSubmitForm=(e)=>{
    e.preventDefault();
    this.props.onSaveTask(this.state);
    this.onClear();
    this.closeForm();
  }
  onClear=()=>{
      this.setState({
          name:"",
          status:false  
      })
  }
  render() {
    const {id}=this.state;
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <div className="row">
                <div className="col-10">{id!==''?"Cập nhật công việc":"Thêm công việc"}</div>
                <div className="col-2 text-right">
                  <span
                    onClick={this.closeForm}
                    className="text-right btn-close-form"
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmitForm}>
                <div className="form-group">
                  <label>Tên</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    name="name"
                    onChange={this.onChange}
                    value={this.state.name}
                  />
                </div>
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select id="inputState" onChange={this.onChange} name="status" value={this.state.status} className="form-control">
                    <option value={false}>Ẩn</option>
                    <option value={true}>Kích hoạt</option>
                  </select>
                </div>
                <div className="row">
                  <div className="col-12 text-right">
                    <button type="submit" className="btn btn-success mb-2 mr-2">
                      Lưu lại
                    </button>
                    <button type="button" className="btn btn-danger mb-2" onClick={this.onClear}>
                      Hủy bỏ
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// Chuyen state tren store thanh prop 
const mapStateToProps=(state)=>{
  return{
    itemediting: state.itemediting
  }
}
const mapDispatchToProp=(dispatch, props)=>{
  return {
    //props func giong truyen nguoc lai parent
    onSaveTask:(task)=>{
      dispatch(action.saveTask(task))
    },
    onCloseForm: ()=> {
      dispatch(action.closeForm())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProp) (TaskForm);
