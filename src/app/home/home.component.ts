import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  flag=false;
  onclick()
  {
    this.flag=true;
    } 
  constructor(private router:Router){
   
  }
  user(){
    this.router.navigate(['/userform']);
   }

}
