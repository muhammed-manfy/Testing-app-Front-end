import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../APIs/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit{

  apiGetUser:any;
  user_id = localStorage.getItem('user-id');
  userInfo:any;

  constructor( private userSerivce:UserService,
    private router:Router,private snackBar:MatSnackBar){}


  async ngOnInit():Promise<void>{
    (await this.userSerivce.getUser(this.user_id)).subscribe(user=>{
        this.apiGetUser = user;
        this.userInfo  =this.apiGetUser.data;
    });
  }
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user-id");
    this.router.navigateByUrl('/login');
    this.snackBar.open("You Are logged out","Ok",{
      duration: 3 * 1000,
      horizontalPosition:"center",
      verticalPosition:"bottom",
      panelClass:['success']
    });
  }
}
