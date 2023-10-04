import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasksService } from '../APIs/tasks/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent {
  deleteTaskApiResponse: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TasksService, private snackBar: MatSnackBar) { }

  async deleteTask(taskId: any) {
    (await this.taskService.deleteTask(taskId)).subscribe(response => {
      this.deleteTaskApiResponse = response;
      this.snackBar.open(this.deleteTaskApiResponse.message, "Ok", {
        duration: 3 * 1000,
        horizontalPosition: "left",
        verticalPosition: "bottom",
        panelClass: ['success']
      });
      setTimeout(() => {
        document.location.reload();
      },3000)
    }, (error) => {
      this.snackBar.open(error.error.message, "Ok", {
        duration: 3 * 1000,
        horizontalPosition: "left",
        verticalPosition: "bottom",
        panelClass: ['error']
      });
    });
  }
}
