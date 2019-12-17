import { Component, OnInit, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalService } from '../service/modal-service';
import { ProjectMGMTService } from '../service/project-mgmt.service';
import { ParentTask,Task } from '../service/project-mgmt.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],  
})

export class TaskComponent implements OnInit {
  today : Date = new Date();
  tomorrow : Date = new Date();
  constructor(private service : ProjectMGMTService, private modalService : ModalService, private _route : ActivatedRoute) { }
  isReadOnly : boolean;
  isChecked : boolean;
  UserName : string;
  ProjectNm : string;
  isdisabled : boolean ;
  parentTaskNM : string;
  isparentTask : Boolean;
  public ButtonName : string ="Add";
  PTaskData = new ParentTask();
  CTask : Task;

  ngOnInit() { 
    this._route.paramMap.subscribe (parameterMap => { const id = +parameterMap.get('id');
    this.getTaskID(id);
    });
    
  }

  private getTaskID(id : number)
  {     
    if(id === 0)
    {
      this.ResetForm();
    }
    else{
      this.ButtonName ="Update";
      this.isReadOnly = false;      
      this.service.getTaskList();
      this.service.taskData = this.service.taskList.find(obj => obj.TaskID == id);   
      this.CTask={ 
        TaskID : this.service.taskData.TaskID,
        TaskName : this.service.taskData.TaskName,
        ProjectID : this.service.taskData.ProjectID,
        ParentTaskID : this.service.taskData.ParentTaskID,
        Priority : this.service.taskData.Priority,
        StartDate : this.service.taskData.StartDate.slice(0,10),
        EndDate : this.service.taskData.StartDate.slice(0,10),
        Status : this.service.taskData.Status,
        UserID : this.service.taskData.UserID
      }
      this.service.getProjectName(this.CTask.ProjectID).toPromise().then(res => {this.ProjectNm = res.ProjectName});
      this.service.getParentTaskName(this.CTask.ParentTaskID).toPromise().then(res => { this .parentTaskNM = res.ParentTaskName});
      this.service.getUser(this.CTask.UserID).toPromise().then(res => { this.UserName = res.FirstName + " " + res.LastName });      
    } 
  }

  ResetForm(form? : NgForm)
  {
    this.ProjectNm ='';
      this.parentTaskNM ='';
      this.UserName =''; 
      this.tomorrow.setDate(this.today.getDate() +1);   
      this.isReadOnly = true;
      this.isdisabled = false;
      this.isChecked =false;      
      this.CTask={
        TaskID : 0,
        TaskName : null,
        ProjectID : null,
        ParentTaskID : null,
        Priority : 0,
        StartDate : this.today.toISOString().substr(0,10),
        EndDate : this.tomorrow.toISOString().substr(0,10),
        Status : '',
        UserID : null
      }
  }

  statuschange(eve)
  {
    if (eve.target.checked)
    { 
      this.ProjectNm ='';
      this.CTask.ProjectID=null;
      this.CTask.Status ="";
      this.isdisabled = true;
      this.isparentTask = true;
    }
    else
    {
      this.isdisabled = false;
      this.isparentTask = false;
    }
  }

  openModal(id : string)
  { 
    if(id == "custom-modal-project")
    this.service.getProjectList();
    else if (id == "custom-modal-task")
    this.service.getParentTaskList();
    else if (id == "custom-modal-user")
    this.service.getUserList();

    this.modalService.open(id);
  }

  closeModal(id : string)
  {
    this.modalService.close(id);
  }

  SelectProject(id : number, projectNM : string)
  {
    this.CTask.ProjectID =id;    
    this.ProjectNm =projectNM;             
    this.closeModal('custom-modal-project'); 
  }

  SelectTask(id : number, taskNM : string)
  {
    this.CTask.ParentTaskID = id;
    this.parentTaskNM = taskNM;
    this.closeModal('custom-modal-task'); 
  }

  SelectUser(id : number, FName : string, LName : string)
  {
    this.CTask.UserID =id;    
    this.UserName = FName + " " + LName;
    this.closeModal('custom-modal-user');    
  }

  onSubmit(form : NgForm)
  {
    if(this.isparentTask == true)
    {
      this.PTaskData ={
        ParentTaskID : 0,
        ParentTaskName : form.value.TaskName
      }
      this.insertParentTask(this.PTaskData);
    }
    else{
      this.CTask ={
        TaskID : form.value.TaskID,
        TaskName : form.value.TaskName,
        ProjectID : form.value.ProjectID,
        ParentTaskID : form.value.ParentTaskID,
        Priority : form.value.Priority,
        StartDate : form.value.StartDate,
        EndDate : form.value.EndDate,
        Status : form.value.Status,
        UserID : form.value.UserID
      }
    if(form.value.TaskID == 0)
    {      
    this.insertTask(this.CTask);
    }
    else{
    this.updateTask(this.CTask);
    }
    }
  }

  insertParentTask(ptTaskData : ParentTask)
  {
    this.service.postParentTask(ptTaskData).subscribe(res => {
      alert("ParentTask Added");
      this.ResetForm();
    });
  }

  insertTask(cTaskData : Task)
  {      
    this.service.postTask(cTaskData).subscribe(res => {
      alert("Task Added");
      this.ResetForm();
    });            
  }

  updateTask(cTaskData : Task)
  {
    this.service.putTask(cTaskData).subscribe(res => {
      alert("Task Updated");
      this.ResetForm();
    });
  }
}
