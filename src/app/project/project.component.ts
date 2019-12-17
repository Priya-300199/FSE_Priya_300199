import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectMGMTService } from '../service/project-mgmt.service';
import { ProjectMGMT, Users} from '../service/project-mgmt.model';
import { ModalService } from '../service/modal-service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  today : Date = new Date();
  tomorrow : Date = new Date();
  User : Users;
  constructor(private service : ProjectMGMTService, private modalService : ModalService) {}  
  isReadOnly : boolean;
  is_ReadOnly : boolean;
  isChecked : boolean;
  UserName : string;
  taskCount : number;
  public ButtonName : string ="Add";
  

  ngOnInit() {      
    this.UserName ='';
    this.is_ReadOnly = true;
    this.ResetForm();    
    this.isReadOnly = true;
    this.service.formData  
  }

  ResetForm(form? : NgForm)
  {
      this.ButtonName ="Add";      
      this.tomorrow.setDate(this.today.getDate() + 1);
      this.service.formData={     
        ProjectID : 0,
        ProjectName : '',
        StartDate : this.today.toISOString().substr(0,10),
        EndDate : this.tomorrow.toISOString().substr(0,10),
        Priority : 0,
        UserID : null
      }
      this.UserName ='';    
      this.isChecked = false;
      this.isReadOnly = true;
      this.service.getProjectList();
      
  }

  statuschange(eve)
  {
    if (eve.target.checked)
    {    
      this.isReadOnly = false;
    }
    else
    {
      this.isReadOnly = true;
    }
  }

  onSubmit(form : NgForm)
  {
    if(form.value.ProjectID == 0)
    this.insertProject(form);
    else
    this.updateProject(form);
  }
  insertProject(form : NgForm)
  {     
    this.service.postProject(form.value).subscribe(res => {
      alert("Project Added");
      this.ResetForm(form);
    });            
  }

  updateProject(form : NgForm)
  {
    this.service.putProject(form.value).subscribe(res => {
      alert("Project Updated");
      this.ResetForm(form);
    });
  }

  Sort(sortBy : string)
  {
    this.service.sortProjectList(sortBy);
  }

  UpdateProject(prj : ProjectMGMT)
  {
    this.isReadOnly = false;
    this.service.formData.ProjectID = prj.ProjectID;
    this.service.formData.ProjectName = prj.ProjectName;
    this.service.formData.StartDate = prj.StartDate.substr(0,10);
    this.service.formData.EndDate = prj.EndDate.substr(0,10);
    this.service.formData.Priority = prj.Priority;
    this.service.formData.UserID = prj.UserID;    
    this.service.getUser(prj.UserID).toPromise().then(res => { this.UserName = res.FirstName + " " + res.LastName});
    this.isChecked = true;       
    this.ButtonName="Update";
  }

  SuspendProject(Project_ID : number)
  {
    if(confirm("Do you want to Suspend the Project?"))
    {
      this.service.deleteProject(Project_ID).subscribe(res => {
        alert("Project Suspended");        
        this.service.getProjectList();
      }, error => alert("Cannot Suspend Project - Project Mapped with Task"));

    }
  }

  openModal(id : string)
  { 
    this.service.getUserList();
    this.modalService.open(id);
  }

  closeModal(id : string)
  {
    this.modalService.close(id);
  }

  SelectUser(id : number, FName : string, LName : string)
  {
    this.service.formData.UserID =id; 
    this.UserName = FName + " " + LName;
    this.closeModal('custom-modal-user');    
  }

}
