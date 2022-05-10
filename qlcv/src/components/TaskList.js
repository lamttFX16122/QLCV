import React, { Component } from 'react'
import TaskItem from './TaskItem'

 class TaskList extends Component {
     constructor(props){
         super(props);
         this.state={
             filterName:'',
             filterStatus: -1
         }
     }
     onChange=(e)=>{
         const target=e.target;
         const name=target.name;
         let value=target.value;
         this.props.onFilter(
             name==="filterName"? value : this.state.filterName,
             name==="filterStatus"? value: this.state.filterStatus
             )
         this.setState({
             [name]:value
         })
     }
     render(){
        const {tasks,onUpdateStatus,onDelete,onUpdate}=this.props;
        const {filterName, filterStatus}=this.state;
        const renderItem=tasks.map((value, index) => {
            return  <TaskItem 
                         onUpdateStatus={onUpdateStatus} 
                         onDelete={onDelete}
                         onUpdate={onUpdate}
                         key={value.id} 
                         item={value} 
                         index={index}
                         ></TaskItem>
         })
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
                 <td><input onChange={this.onChange} value={filterName} className="form-control form-control-sm" type="text" name='filterName'/></td>
                 <td>
                     <select onChange={this.onChange} name='filterStatus' value={filterStatus} className="form-control form-control-sm">
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
       )
     
     }
}
export default TaskList;
