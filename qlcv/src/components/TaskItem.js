import React, { Component } from 'react'


 class TaskItem extends Component {
  onUpdateStatus=(id)=>{
    this.props.onUpdateStatus(id);
  }
  onDelete=(id)=>{
    this.props.onDelete(id);
  }
  onUpdate=(id)=>{
    this.props.onUpdate(id);
  }
   render(){
    const {item,index}=this.props;
    
  return (
    <tr>
            <th scope="row">{index+1}</th>
            <td>{item.name}</td>
            <td><span onClick={()=>this.onUpdateStatus(item.id)} className={item.status===true? "badge badge-danger": "badge badge-success"}>{item.status===true? "Kích hoạt" : "Ẩn"}</span></td>
            <td className="text-center">
                <button onClick={()=>this.onUpdate(item.id)} className="btn btn-danger mr-2"><i className="fa-solid fa-pen"></i> Sửa</button>
                <button onClick={()=>this.onDelete(item.id)} className="btn btn-warning text-white"><i className="fa-solid fa-trash-can"></i> Xóa</button>
            </td>
        </tr>
  )};
}
export default TaskItem;