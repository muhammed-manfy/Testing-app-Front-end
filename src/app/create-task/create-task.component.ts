import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../Models/Task.model';
import { TasksService } from '../APIs/tasks/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  taskForm !: FormGroup;
  user_id =Number( localStorage.getItem('user-id'));
  taskApiResponse:any;
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar
    ,private taskService:TasksService , private router:Router) {
    this.taskForm = this.formBuilder.group({
      'title': ['', [Validators.required]],
      'description': ['', [Validators.required]]
    });
  }

  get title() {
    return this.taskForm.get('title')?.valid;
  }
  get description() {
    return this.taskForm.get('description')?.valid;
  }

  ngOnInit(): void {
    console.log(this.user_id);
  }

  titleTaskValidation() {
    this.snackBar.open("Task Title is required", "Close", {
      duration: 3 * 1000,
      horizontalPosition: "left",
      verticalPosition: 'bottom',
      panelClass: ['error']
    });
  }

  descriptionTaskValidation() {
    this.snackBar.open("Task Description is required", "Close", {
      duration: 3 * 1000,
      horizontalPosition: "left",
      verticalPosition: 'bottom',
      panelClass: ['error']
    });
  }

  async createTask() {
    if (!this.title)
      this.titleTaskValidation();
    else if (!this.description)
      this.descriptionTaskValidation();
    else {
      const taskInfo = {
        user_id:this.user_id,
        title:this.taskForm.get('title')?.value,
        description:this.taskForm.get('description')?.value
      };
      (await this.taskService.createTask(taskInfo)).subscribe(response=>{
        this.taskApiResponse = response;
        console.log(this.taskApiResponse);
        this.snackBar.open(this.taskApiResponse.message, "Close", {
          duration: 3 * 1000,
          horizontalPosition: "left",
          verticalPosition: 'bottom',
          panelClass: ['success']
        });
        this.router.navigateByUrl('/dashboard');
      },(error)=>{
        this.snackBar.open(error.error.message, "Close", {
          duration: 3 * 1000,
          horizontalPosition: "left",
          verticalPosition: 'bottom',
          panelClass:['error']
        });
      });
    }
  }
}

