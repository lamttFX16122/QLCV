import "./App.css";
import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import  Control from "./components/Control";
import  TaskList  from "./components/TaskList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      updating:null,
      filter:{
        name:"",
        status:-1
      },
      keyWord:'',
      sort:{
        by:'name',
        val:1
      }
    };
  }
  componentDidMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      this.setState({
        tasks: JSON.parse(localStorage.getItem("tasks")),
      });
    }
  }
  generateList = () => {
    let task = [
      {
        id: this.generateID(),
        name: "ReactJS",
        status: true,
      },
      {
        id: this.generateID(),
        name: "NodeJS",
        status: false,
      },
      {
        id: this.generateID(),
        name: "JavaScript",
        status: true,
      },
    ];
    this.setState({
      tasks: task,
    });
    localStorage.setItem("tasks", JSON.stringify(task));
  };
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  generateID() {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4() +
      this.s4()
    );
  }
  toggleForm = () => {
    if(this.state.isDisplayForm && this.state.updating!==null)
    {
      this.setState({
        isDisplayForm:true,
        updating:null
      });
    }
    else
    {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        updating:null
      });      
    }
  };
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  };
  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  };
  onSubmitForm=(data)=>{
    var {tasks}=this.state;
    if(data.id!=='')
    {
        const index=this.findIndexId(data.id);
        tasks[index]=data;
    }
    else
    {
      data.id=this.generateID();
      tasks.push(data);
    }
 
    this.setState({
      tasks:tasks
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
  onUpdateStatus=(id)=>{
    const{tasks}=this.state;
    const index=this.findIndexId(id);
    if(index!==-1)
    {
      tasks[index].status=!tasks[index].status;
      this.setState({
        tasks:tasks
      })
      localStorage.setItem(tasks, JSON.stringify(tasks));
    }
  }
  findIndexId(id)
  {
    let resultIndex=-1;
    this.state.tasks.findIndex((value, index) => {
      if(value.id===id)
      {
        resultIndex=index;
      }
    })
    return resultIndex; 
  }
  onDelete=(id)=>{
    const {tasks}=this.state;
    const index=this.findIndexId(id);
    if(index!==-1)
    {
      tasks.splice(index,1);
      this.setState({
        tasks:tasks
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    this.onCloseForm();
  }
  onUpdate=(id)=>{
    const {tasks}=this.state;
    const index=this.findIndexId(id);
    this.setState({
      updating: tasks[index]
    });
    this.onShowForm();
  }
  onFilter=(filterName,filterStatus)=>{
    filterStatus=Number(filterStatus);
    this.setState({
     filter:{
       name:filterName.toLowerCase(),
       status:filterStatus
     }
    })
  }
  onSearch=(keyWord)=>{
    this.setState(
      {
        keyWord:keyWord.toLowerCase()
      }
    )
  }
  onSort=(sort)=>{
    this.setState({
      sort:{
        by: sort.by,
        val:sort.val
      }
    })
 
  }
  render() {
    let { tasks, isDisplayForm,updating, filter, keyWord, sort} = this.state;
    if(filter)
    {
      if(filter.name!==""){
        tasks=tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name)!==-1;
        })
      }
      tasks=tasks.filter((task)=>{
        if(filter.status==-1)
        {
          return task;
        }
        else
        {
          return task.status===(filter.status===1?true:false);
        }
      })
    }
    if(keyWord)
    {
      tasks=tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(keyWord)!==-1;
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
    const elementFrom = isDisplayForm ? (
      <TaskForm 
        onCloseForm={this.onCloseForm}
        onSubmitForm={this.onSubmitForm}
        updating={updating}
        />
    ) : (
      ""
    );
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mt-3">
            <h2>Quản Lý Công Việc</h2><p>{React.version}</p>
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
                <button
                  type="button"
                  onClick={this.generateList}
                  className="btn btn-danger ml-2"
                >
                  {" "}
                  Generate
                </button>
              </div>
            </div>
            {/* <!-- Search/Sort --> */}
            <div className="row mt-3">
              {/* Search and sort */}
              <Control onSearch={this.onSearch}
                        onSort={this.onSort}
              ></Control>
              {/* Table */}
              <div className="row w-100">
                <div className="col-12">
                  <TaskList tasks={tasks}
                             onUpdateStatus={this.onUpdateStatus}
                             onDelete={this.onDelete}
                             onUpdate={this.onUpdate}
                             onFilter={this.onFilter}
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

export default App;
