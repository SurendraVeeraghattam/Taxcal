import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginuserdetails = new FormGroup({
    'email': new FormControl('',[Validators.required]),
    'password' : new FormControl('',[Validators.required])
  })

  user = {
    email: '',
    password :''
  }

}
