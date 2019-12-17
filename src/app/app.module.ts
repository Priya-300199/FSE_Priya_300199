import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { UsersComponent } from './users/users.component';
import { ProjectMGMTService } from './service/project-mgmt.service';
import { ModalComponent } from './_components/modal.componenet';
import { ViewTaskComponent } from './view-task/view-task.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    TaskComponent,
    UsersComponent,
    ModalComponent,
    ViewTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProjectMGMTService],
  bootstrap: [AppComponent]
})
export class AppModule { }
