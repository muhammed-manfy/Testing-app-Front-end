import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceApisService {
  protected BASE_URL:String = 'http://localhost:8000/api';

  protected token : any = localStorage.getItem('token');

  protected headers = new HttpHeaders()
  .append('token_authorization', `${this.token}`);
  
  constructor() { }
}
