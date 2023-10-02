import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceApisService } from '../AuthSerivceApis/auth-service-apis.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/user.mode';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AuthServiceApisService {

  constructor(private http:HttpClient) {
    super();
  }

  async registerUser(userData: any):Promise<Observable<User>>{
    return await this.http.post<User>(this.BASE_URL+'/user/register',userData);
  }

  async loginUser(userData: any):Promise<Observable<User>>{
    return await this.http.post<User>(this.BASE_URL+'/user/login',userData);
  }

  async getUser(userId: any):Promise<Observable<User>>{
    return await this.http.get<User>(this.BASE_URL+'/user/getUser/'+userId,{headers:this.headers});
  }

}
