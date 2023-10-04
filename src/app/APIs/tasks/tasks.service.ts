import { Injectable } from '@angular/core';
import { AuthServiceApisService } from '../AuthSerivceApis/auth-service-apis.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/Models/Task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends AuthServiceApisService {

  constructor(private http: HttpClient) {
    super();
  }

  async createTask(taskData: any): Promise<Observable<Task>> {
    return await this.http.post<Task>(this.BASE_URL + '/task/createTask', taskData, { headers: this.headers });
  }
  async updateTask(taskData: any, taskId: any): Promise<Observable<Task>> {
    return await this.http.put<Task>(this.BASE_URL + '/task/updateTask/' + taskId, taskData, { headers: this.headers });
  }
  async deleteTask(taskId: any): Promise<Observable<Task>> {
    return await this.http.delete<Task>(this.BASE_URL + '/task/deleteTask/' + taskId, { headers: this.headers });
  }
  async getUserTasks(userId: any): Promise<Observable<Task>> {
    return await this.http.get<Task>(this.BASE_URL + '/task/userTasks/' + userId, { headers: this.headers });
  }
  async getTask(taskId: any): Promise<Observable<Task>> {
    return await this.http.get<Task>(this.BASE_URL + '/task/getTask/' + '4', { headers: this.headers });
  }
}
