import { trigger } from '@angular/animations';
import { identifierName } from '@angular/compiler';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { UserformService } from 'src/app/service/userform.service';
import { user } from './userform.model';
import { SharedService } from 'src/app/userformshared/shared.service';


@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss']
})
export class UserformComponent implements OnInit{
  details : any;
  data: any;
  userdetail : any;
  submit = false;
  userId : any;
  updatable : boolean=false;
  formerror = Array.from({length:15}, ()=>false);

  userdetails = new FormGroup({
    'userId': new FormControl(''),
    'userName': new FormControl('',[Validators.required]),
    'finacialYear': new FormControl('',[Validators.required]),
    'age' : new FormControl('',[Validators.required]),
    'earn' : new FormControl('',[Validators.required])
  })
 
  user = {
    userName : '',
    finacialYear: '',
    age :'',
    earn : '' 
  }
  userNameref: any;
  finacialYearref: any;
  ageref: any;
  earnref: any;

  
  
  
  // userform(){
  //   console.warn(this.userdetails.value);
  // }
  get userName(){
    return this.userdetails.get('userName');
  }
  get finacialYear(){
    return this.userdetails.get('finacialYear');
  }
  get age(){
    return this.userdetails.get('age');
  }
  get earn(){
    return this.userdetails.get('earn');
  }

  

  // details : user[];
  @ViewChild('details') Form!: FormGroup;
  
   constructor(private router:Router, private userservice:UserformService, private route: ActivatedRoute,
     private dataservice: DataService, private sharedservice:SharedService){
    this.userdetail = this.userservice.getuserdetails();
    console.log(this.userdetail);
    // this.details = new Array<details>
    if(this.userdetail!=undefined){
      this.user = this.userdetail;
    this.userdetails.get('userId')?.setValue(this.userdetail?.userId);
    this.userdetails.get('userName')?.setValue(this.userdetail?.userName);
    this.userdetails.get('finacialYear')?.setValue(this.userdetail?.finacialYear);
    this.userdetails.get('age')?.setValue(this.userdetail?.age);
    this.userdetails.get('earn')?.setValue(this.userdetail?.earn);
  }
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.updatable=params['updatable'];
   })
  //  this.user = this.userdetail;
  //   console.log(this.user);
  }

  Saving(){
    this.validate();
    this.formCheck();
    if(this.userdetails.invalid){
      alert("please enter valid details");
    }
    if(this.userdetails.valid){
      this.sharedservice.userformdata = this.userdetails.value;
      console.log(this.sharedservice.userformdata);
      alert("saved successfully");
    this.router.navigate(['/incomeform']);
    }
  }

   postform(){
    this.validate();
    this.formCheck();
    if(this.userdetails.invalid){
      alert("please enter valid details");
    }
    if(this.userdetails.valid)
    this.details = this.userservice.postform(this.userdetails.value).subscribe(data=>{
      this.userId = data.userId;
      console.log(this.userId);
      console.log(data); 
      alert("submitted successfully");
    this.router.navigate(['/incomeform']);
    })
   }

   get(){
    this.details = this.dataservice.getdata().subscribe(data=>{
      console.log(data);
    })
    this.router.navigate(['/datapage']);
   }

   update(id:any){
    //console.log("test section",id);
    //this.userdetails = this.sharedservice.incomeformdata;
    this.details = this.dataservice.update(id).subscribe(data=>{
     console.log("test section",id);
     this.userId = id.userId;
     console.log(this.userId);
    //  this.submit = id;
    })
    
    this.get();
    //this.router.navigate(['/incomeform']);
    console.log(this.userdetail.userId);
    this.router.navigate(['/data'],{queryParams:{userId:this.userdetail.userId}});
   }

   navnext(){
    this.router.navigate(['/incomeform']);
   }
   validate(){
    if(this.user.userName ==''){
      this.formerror[0] = true;
      this.userNameref='<span> Username is required</span>'
    }
     else{
      this.formerror[0] = false;}
  
      if(this.user.finacialYear == ''){
      this.formerror[1] = true;
      this.finacialYearref='<span> Financial year is required</span>'
    }
      else{
      this.formerror[1] = false;}
    
      if(this.user.age == ''){
      this.formerror[2] = true;
      this.ageref='<span> Age is required</span>'
    }
      else{
      this.formerror[2] = false;}
  
      if(this.user.earn == ''){
      this.formerror[3] = true;
      this.earnref='<span> Earn type is required</span>'
    }
      else{
      this.formerror[3] = false;}
   }  

   formCheck(){

     for(let i=0;i<this.formerror.length;i++)
     {
     if(this.formerror[i]){
        return true;
    }
  }
   return false;
  }



  // onSubmit() {
  //   // Get all Form Controls keys and loop them
  //   Object.keys(this.userdetails.controls).forEach(key => {
  //     // Get errors of every form control
  //     console.log(this.userdetail.get(key).errors);
  //   });
  // }
}
