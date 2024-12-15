import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupuserdetails = new FormGroup({
    'userName': new FormControl('',[Validators.required]),
    'email': new FormControl('',[Validators.required]),
    'password' : new FormControl('',[Validators.required]),
    'confirm' : new FormControl('',[Validators.required])
  })

  user = {
    userName : '',
    email: '',
    password :'',
    confirm : '' 
  }

  postDataSignup(){

  }
}
