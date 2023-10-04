import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../APIs/tasks/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent {
  taskForm !: FormGroup;
  task_id: any;
  taskApiResponse: any;
  taskInfo: any;
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar
    , private taskService: TasksService, private route: ActivatedRoute,
    private router: Router) {
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

  async ngOnInit(): Promise<void> {
    this.task_id = this.route.snapshot.queryParamMap.get('taskId');
    (await this.taskService.getTask(this.task_id)).subscribe(taskResponse => {
      this.taskInfo = taskResponse;
    });
  }

  showTitleTaskMessage() {
    this.snackBar.open("Task Title is required", "Close", {
      duration: 3 * 1000,
      horizontalPosition: "left",
      verticalPosition: 'bottom',
      panelClass: ['error']
    });
  }

  showDescriptionTaskMessage() {
    this.snackBar.open("Task Description is required", "Close", {
      duration: 3 * 1000,
      horizontalPosition: "left",
      verticalPosition: 'bottom',
      panelClass: ['error']
    });
  }

  async updateTask() {
    if (!this.title)
      this.showTitleTaskMessage();
    else if (!this.description)
      this.showDescriptionTaskMessage();
    else {
      var taskInfo = {
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value
      };
      (await this.taskService.createTask(taskInfo)).subscribe(response => {
        this.taskApiResponse = response;
        console.log(this.taskApiResponse);
        this.snackBar.open(this.taskApiResponse.message, "Close", {
          duration: 3 * 1000,
          horizontalPosition: "left",
          verticalPosition: 'bottom',
          panelClass: ['success']
        });
        this.router.navigateByUrl('/dashboard');
      }, (error) => {
        this.snackBar.open(error.error.message, "Close", {
          duration: 3 * 1000,
          horizontalPosition: "left",
          verticalPosition: 'bottom',
          panelClass: ['error']
        });
      });
    }
  }
}
