export class ProjectMGMT {
    ProjectID : number;
    ProjectName : string;
    StartDate : string;
    EndDate : string;
    Priority : number;
    UserID : number;
}
export class Users{
    UserID : number;
    FirstName : string;
    LastName : string;
}
export class ParentTask{    
    ParentTaskID : number;
    ParentTaskName : string;
}
export class Task{
    TaskID : number;
    TaskName : string;
    ProjectID : number;
    ParentTaskID : number;
    Priority : number;
    StartDate : string;
    EndDate : string;
    Status : string;
    UserID : number;
}
export class ProjectTskVW {
    ProjectID : number;
    ProjectName : string;
    StartDate : string;
    EndDate : string;
    Priority : number;
    UserID : number;
    TaskCount : number;
    CompletedTask : number;
}
