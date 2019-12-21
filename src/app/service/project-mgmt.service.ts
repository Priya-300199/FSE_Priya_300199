import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { ProjectMGMT, Users, Task, ParentTask, ProjectTskVW } from './project-mgmt.model';



@Injectable({
  providedIn: 'root'
})
export class ProjectMGMTService {
  
  formData : ProjectMGMT;
  projectList : ProjectTskVW[];
  userData : Users;
  userList : Users[];
  parentTaskData : ParentTask;
  parentTaskList : ParentTask[];
  taskData : Task;
  taskList : Task[];
  ptaskName : string = '';
  taskCount : number;
  readonly rootURL ="http://localhost:51494/api";
  constructor(private http : HttpClient) { } 


  //Projects

  postProject(formData : ProjectMGMT)
  {
   return this.http.post(this.rootURL+'/Projects',formData);
  }
  
  getProjectList()
  {
    this.http.get(this.rootURL + '/ProjectVWs').toPromise().then(res => this.projectList = res as ProjectTskVW[]);
  }

  getProjectName(id : number)
  {
    return this.http.get<ProjectMGMT>(this.rootURL + '/Projects/' + id);
  }

  sortProjectList(sortBy : string)
  {
    let sortParam = new HttpParams().set('strSortBy',sortBy);
    this.http.get(this.rootURL + '/ProjectVWs',{params:sortParam}).toPromise().then(res => this.projectList=res as ProjectTskVW[]);
  }

  putProject(formData : ProjectMGMT)
  {
    return this.http.put(this.rootURL + '/Projects/'+formData.ProjectID,formData);
  }

  deleteProject(Project_ID : number)
  {
    return this.http.delete(this.rootURL+'/Projects/'+Project_ID);
  }

  //Users
  postUser(userData : Users)
  {    
    return this.http.post(this.rootURL + '/Users',userData);
  }

  getUserList()
  { 
    
    this.http.get(this.rootURL + '/Users',{headers: hdrs}).toPromise().then(res => this.userList=res as Users[]);
  }

  getUser(id : number)
  {
    return this.http.get<Users>(this.rootURL + '/Users/' + id);
  }

  sortUserList(sortBy : string)
  {
    let sortParam = new HttpParams().set('strSortBy',sortBy);    
    this.http.get(this.rootURL + '/Users',{params:sortParam}).toPromise().then(res => this.userList=res as Users[]);
  }

  putUser(userData : ProjectMGMT)
  {
    return this.http.put(this.rootURL + '/Users/' + userData.UserID,userData);
  }

  deleteUser(User_ID : number) 
  {
    return this.http.delete(this.rootURL+'/Users/' + User_ID);        
  }

  //ParentTask
  postParentTask(parentTaskData : ParentTask)
  {    
    return this.http.post(this.rootURL + '/ParentTasks',parentTaskData);
  }

  getParentTaskName(id : number)
  {
    return this.http.get<ParentTask>(this.rootURL + '/ParentTasks/' + id);
  }

  getParentTaskList()
  {
    this.http.get(this.rootURL + '/ParentTasks').toPromise().then(res => this.parentTaskList = res as ParentTask[]);
  }

  putParentTask(parentTaskData : ParentTask)
  {
    return this.http.put(this.rootURL + '/ParentTasks/' + parentTaskData.ParentTaskID,parentTaskData);
  }

  //Task
  postTask(taskData : Task)
  {
   return this.http.post(this.rootURL+'/Tasks',taskData);
  }

  getTask(tskid : number)
  {    
    let getParam = new HttpParams().set('idname','Task');    
    return this.http.get<Task>(this.rootURL + '/Tasks/' + tskid,{params:getParam});   
  }

  getTaskList()
  {
    this.http.get(this.rootURL + '/Tasks').toPromise().then(res => this.taskList=res as Task[]);    
  }

  getTaskListbyID(prjID : number)
  {
    let getParam = new HttpParams().set('idname','Project');
    this.http.get(this.rootURL + '/Tasks/' + prjID ,{params:getParam}).toPromise().then (res => this.taskList = res as Task[]);
  }
  
  sortTaskList(prjid : number, sortBy : string)
  {    
    let sortParam = new HttpParams().set('strSortBy',sortBy);
    this.http.get(this.rootURL + '/Tasks/' + prjid,{params:sortParam}).toPromise().then(res => this.taskList=res as Task[]);
  }

  putTask(taskData : Task)
  {
    return this.http.put(this.rootURL + '/Tasks/'+taskData.TaskID,taskData);
  }

  deleteTask(Task_ID : number)
  {
    return this.http.delete(this.rootURL+'/Tasks/'+Task_ID);
  }

}
 