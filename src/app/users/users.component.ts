import { Component, OnInit, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectMGMTService } from '../service/project-mgmt.service';
import { Users } from '../service/project-mgmt.model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private service : ProjectMGMTService) { }
  public ButtonName : string ="Add";

  ngOnInit() {
    this.service.getUserList();
    this.ResetForm();
  }

  onSubmit(form : NgForm)
  {
    if(form.value.UserID == 0)
    this.insertUser(form);
    else
    this.updateUser(form);
  }

  insertUser(form : NgForm)
  {
    this.service.postUser(form.value).subscribe(res => {
      alert("User Added");
      this.ResetForm(form);
    });
  }

  updateUser(form : NgForm)
  {
      this.service.putUser(form.value).subscribe(res => {
        alert("User Updated");
        this.ResetForm(form);
      });      
  }

  ResetForm(form? : NgForm)
  {
    if(form!=null)
    form.resetForm();
      this.ButtonName ="Add";
       
    this.service.userData={     
      UserID : 0,
      FirstName : '',
      LastName : ''
    }    
    this.service.getUserList();  
  }

  Sort(sortBy : string)
  {
    this.service.sortUserList(sortBy);
  }

  UpdateUser(usr : Users)
  {
    this.service.userData.UserID = usr.UserID;
    this.service.userData.FirstName = usr.FirstName;
    this.service.userData.LastName = usr.LastName;
    this.ButtonName="Update";
  }

  DeleteUser(UserID : number)
  {
    if(confirm("Do you want to Delete User Details?"))
    {
      this.service.deleteUser(UserID).subscribe(res => {
        alert("User Details Removed");
        this.service.getUserList();
      },error => alert("Cannot Remove User Details - User Mapped with Project or Task"));
    }
    
  }

}
