import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { UsersComponent } from './users/users.component';
import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = [
  // {path: '', redirectTo: 'Project', pathMatch: 'full'},
  {path: 'Project',component:ProjectComponent},
  {path: 'Task/:id',component:TaskComponent},
  {path: 'User',component:UsersComponent},
  {path: 'ViewTask',component:ViewTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
