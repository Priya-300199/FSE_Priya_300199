import { Component, OnInit, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalService } from '../service/modal-service';
import { ProjectMGMTService } from '../service/project-mgmt.service';
import { Task } from '../service/project-mgmt.model';
import { Router } from '@angular/router';

 
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
 
  constructor(private service : ProjectMGMTService, private modalService : ModalService, private router : Router) { }
  isReadOnly : boolean =true;
  ProjectNm : string;
  pagename : string = 'Task';
  message : string  ="Input";
  ngOnInit() {
    
    this.service.getTaskList();
    this.ResetForm();
  }
  ResetForm(form? : NgForm)
  {
    this.ProjectNm ='';
    this.isReadOnly=true;
    this.service.taskData = {
      TaskID : 0,
      TaskName : '',
      ProjectID : null,
      ParentTaskID : null,
      Priority : 0,
      StartDate : null,
      EndDate : null,
      Status : '',
      UserID : null
    }    
  }

  openModal(id : string)
  { 
    this.service.getProjectList();
    this.modalService.open(id);
  }

  closeModal(id : string)
  {
    this.modalService.close(id);
  }
  
  ClearProject()
  {
    this.service.taskData.ProjectID = null;
    this.ProjectNm ='';
    this.service.getTaskList();
  }

  Sort(prjid : number, sortBy : string)
  {
    if(prjid == null) prjid =0;
    this.service.sortTaskList(prjid, sortBy);
  }

  SelectProject(id : number, projectNM : string)
  {
    this.service.taskData.ProjectID =id;    
    this.ProjectNm =projectNM;  
    this.service.getTaskListbyID(id);
    this.closeModal('custom-modal-project'); 
  }

  UpdateTask(tsk : Task)
  {   
    this.router.navigate(['/Task',tsk.TaskID]);
  }

  EndTask(id : number)
  {
    if(confirm("Do you want to Delete Task Details?"))
    {
    this.service.deleteTask(id).subscribe(res => {
      alert("Task Details Removed");
      this.service.getTaskList();
    });
    }
  }

}
