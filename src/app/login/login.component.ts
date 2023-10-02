import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../APIs/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginUserValidationComponent } from '../Validation/login-user-validation/login-user-validation.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  passwordType = "password";
  loginForm!: FormGroup;
  @ViewChild('password') passwordElement!: ElementRef;
  userApiResponse: any;
  username: String = '';
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    private route: Router, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get('email')?.valid;
  }
  get password() {
    return this.loginForm.get('password')?.valid;
  }

  ngOnInit(): void {

  }

  getUsername(value: string): String {
    this.username = value;
    let usernameArray = this.username.split(' ');
    this.username = usernameArray.join('');
    return this.username;
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordElement.nativeElement.type;
    if (this.passwordType == 'password') {
      this.passwordType = "text"
    } else {
      this.passwordType = "password";
    }
  }

  validationNotification() {
    const data = {email:this.email,password:this.password};
    this.snackBar.openFromComponent(LoginUserValidationComponent,{
      data:data ,
      horizontalPosition:"left",
      verticalPosition:"bottom",
      duration: 3 * 1000
    });
  }

  async login() {
    if (this.loginForm.invalid)
      this.validationNotification();
    else {
      const loginData = {
        email: this.loginForm.get('email')?.value.toString(),
        password: this.loginForm.get('password')?.value.toString(),
      };
      (await this.userService.loginUser(loginData)).subscribe(response => {
        this.userApiResponse = response;
        localStorage.setItem('token',this.userApiResponse.token);
        localStorage.setItem('user-id', this.userApiResponse.user_id);
        this.snackBar.open(this.userApiResponse.message, "Ok", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['success']
        });
        this.route.navigateByUrl('/dashboard');
      }, (error) => {
        this.snackBar.open(error.error.message, "Close", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['error']
        });
      })
    }
  }
}
