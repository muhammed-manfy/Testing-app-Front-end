import { Component, Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-user-validation',
  templateUrl: './register-user-validation.component.html',
  styleUrls: ['./register-user-validation.component.scss']
})
export class RegisterUserValidationComponent {

    constructor(@Inject(MAT_SNACK_BAR_DATA)public data:any){}
}
