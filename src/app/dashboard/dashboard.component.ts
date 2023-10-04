import { Component, OnInit } from '@angular/core';
import { UserService } from '../APIs/user/user.service';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../Models/Task.model';
import { TasksService } from '../APIs/tasks/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user_id = Number(localStorage.getItem('user-id'));
  userTasksApiResponse:any;
  userTasksList : Array<Task> = [];
  constructor(private taskService:TasksService,private router:Router,
    private snackBar:MatSnackBar,private dialog:MatDialog){}

  async ngOnInit():Promise<void>{
    (await this.taskService.getUserTasks(this.user_id)).subscribe(Tasks=>{
        this.userTasksApiResponse = Tasks;
        this.userTasksList = this.userTasksApiResponse.data;
    });
  }

  editTask(taskId:any){
    this.router.navigate(['/Update-Task'],{
      queryParams:{
        taskId:taskId
      }
    });
  }

  deleteTask(taskId:any){
      this.dialog.open(DeleteTaskComponent, {
        width: '250px',
        data:{taskId}
      });
  }
}
