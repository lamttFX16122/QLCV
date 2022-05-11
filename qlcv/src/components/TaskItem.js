import React, { Component } from 'react'
import {connect} from "react-redux";
import * as action from "./../actions/index"

 class TaskItem extends Component {
  onUpdateStatus=(id)=>{
    this.props.onUpdateStatus(id);
  }
  onDelete=(id)=>{
    this.props.onDelete(id);
    this.props.onCloseForm();
  }
  onUpdate=(task)=>{
    this.props.onOpenForm();
    this.props.onEditTask(task);
  }
   render(){
    const {item,index}=this.props;
    
  return (
    <tr>
            <th scope="row">{index+1}</th>
            <td>{item.name}</td>
            <td><span onClick={()=>this.onUpdateStatus(item.id)} className={item.status===true? "badge badge-danger": "badge badge-success"}>{item.status===true? "Kích hoạt" : "Ẩn"}</span></td>
            <td className="text-center">
                <button onClick={()=>this.onUpdate(item)} className="btn btn-danger mr-2"><i className="fa-solid fa-pen"></i> Sửa</button>
                <button onClick={()=>this.onDelete(item.id)} className="btn btn-warning text-white"><i className="fa-solid fa-trash-can"></i> Xóa</button>
            </td>
        </tr>
  )};
}
const mapStateToProps=(state)=>{
  return {
    // task:state.task
  };
}
const mapDispatchToProps=(dispatch, props)=>{
  return{
    onUpdateStatus: (id)=>{
      dispatch(action.updateStatusTask(id));
    },
    onDelete:(id)=>{
      dispatch(action.updateDeleteTask(id));
    },
    onCloseForm:()=>{
      dispatch(action.closeForm());
    },
    onOpenForm:()=>{
      dispatch(action.OpenForm());
    },
    onEditTask:(task)=>{
      dispatch(action.editTask(task));
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (TaskItem);