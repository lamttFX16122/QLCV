import React, { Component } from "react";

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
        const {updating}=this.props;
      if(updating)
      {
        this.setState({
            id:updating.id,
            name:updating.name,
            status:updating.status
        })
      }
    }
    componentWillReceiveProps (nextProps){
        if(nextProps && nextProps.updating)
        {
            this.setState({
                id:nextProps.updating.id,
                name: nextProps.updating.name,
                status: nextProps.updating.status
            })
        }else if(nextProps && nextProps.updating===null)
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
    this.props.onSubmitForm(this.state);
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
export default TaskForm;
