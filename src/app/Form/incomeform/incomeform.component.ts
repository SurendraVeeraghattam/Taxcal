import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { IncomeformService } from 'src/app/service/incomeform.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, formatCurrency } from '@angular/common';
import { from } from 'rxjs';
import { UserformService } from 'src/app/service/userform.service';
import { SharedService } from 'src/app/userformshared/shared.service';



@Component({
  selector: 'app-incomeform',
  templateUrl: './incomeform.component.html',
  styleUrls: ['./incomeform.component.scss']
})
export class IncomeformComponent {
  details : any;
  data : any;
  user :any;
  incomedetail : any;
  submit = false;
  userId : any;
  // incomedetails!: FormGroup;
  updatable : boolean=false;
  formerror = Array.from({length:15}, ()=>false);

  incomedetails = new FormGroup({
    'incomeValue': new FormControl('',[Validators.required]),
    'interestValue': new FormControl(),
    'otherSourceValue' : new FormControl(),
  })
  // formerror = Array.from({length:15}, ()=>false);

  // incomeform(){
  //   console.warn(this.incomedetails.value);
  // }
  income = {
    incomeValue :'',
    interestValue: '',
    otherSourceValue: '',
  }
  incomevalueref:any;

  get incomeValue(){
    //  const value = this.incomedetails.get('incomeValue')?.value;
    //  return this.currencypipe.transform(value);
     return this.incomedetails.get('incomeValue');
  }
  get interestValue(){
    return this.incomedetails.get('interestValue');
  }
  get otherSourceValue(){
    return this.incomedetails.get('otherSourceValue');
  }

  constructor(private router:Router, private incomeservice:IncomeformService, private userservice:UserformService,
    private route:ActivatedRoute, private dataservice: DataService, private toastr:ToastrService,
    private currencypipe: CurrencyPipe, private fb:FormBuilder, private sharedservice:SharedService){

    this.incomedetail = this.incomeservice.getincomedetails();
    console.log(this.incomedetail);
    if(this.incomedetail!=undefined){
    this.income = this.incomedetail.incomeDetModel;
    this.incomedetails.get('incomeValue')?.setValue(this.incomedetail?.incomeDetModel?.incomeValue);
    this.incomedetails.get('interestValue')?.setValue(this.incomedetail?.incomeDetModel?.interestValue);
    this.incomedetails.get('otherSourceValue')?.setValue(this.incomedetail?.incomeDetModel?.otherSourceValue);
    }
   }
  // ngOnInit(): void {
  //   this.incomedetails = this.fb.group({
  //   incomeValue: ['',[Validators.required]],
  //   interestValue:['',[Validators.required]],
  //   otherSourceValue :['',[Validators.required]],
  //   })
   //}


  postform(){
    this.validate1();
    this.formCheck1();
    if(this.incomedetails.invalid){
      alert("please enter valid details");
    }
    if(this.incomedetails.valid)
    this.details = this.userservice.postform(this.sharedservice.userformdata).subscribe(data =>{
      console.log(data);
    });
    this.details = this.incomeservice.postform(this.incomedetails.value).subscribe(data=>{
      console.log(data);
      if(data.incomeId){
        this.userId = data.incomeId;
      }
      alert("submitted successfully");
      this.submit = true;
    })
  }
  generate(){
    console.log(this.userId);
    // this.toastr.success('Calculation Done');
    this.router.navigate(['/data'],{queryParams:{userId:this.userId}});
  }

  back(){
    this.sharedservice.incomeformdata = this.incomedetails.value;
    this.router.navigate(['/userform'],{queryParams:{updatable:true}});
  }

  navnext(){
    this.router.navigate(['/data']);
  }

  validate1(){
    if(this.income.incomeValue ==''){
      this.formerror[4] = true;
      this.incomevalueref='<span> Incomevalue is required</span>'
    }
     else{
      this.formerror[4] = false;}
  }

  formCheck1(){

    for(let i=0;i<this.formerror.length;i++)
    {
    if(this.formerror[i]){
       return true;
   }
 }
  return false;
 }
}
