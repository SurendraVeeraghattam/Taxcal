import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { IncomeformService } from 'src/app/service/incomeform.service';
import { UserformService } from 'src/app/service/userform.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit{

  displayedColumns: string[] = ["userId", "userName", "finacialYear", "age","earn","incomeId","incomeValue","interestValue","otherSourceValue","Tax","NetSalary","edit","delete"];
  userdata : any;
  excel : any;
  id : any;
  @Input() transferById: any;
  

  constructor(private router:Router, private route:ActivatedRoute, private dataservice: DataService, private userservice:UserformService, private incomeservice:IncomeformService ){
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
       this.id=params['userId'];
       console.log(this.id);
      console.log(params);
    })
    // this.id = this.dataservice.getdatabyid();
    console.log(this.id);
    // this.route.paramMap.subscribe(data=>{
    //  this.id = data.get('id');
    //  console.log(this.id);
    // })
    this.getdatauser(this.id);
  }

  getdatauser(id:any){
    // console.log(id,{ queryParams:{ userId: new Date().getTime()}});
    
     this.dataservice.datauser(id).subscribe((data:any)=>{
      this.userdata = [data];
      console.log(data);
    })
  }

  getdownloaduser(){
    console.log(this.id);
    this.dataservice.downloadById(this.id, this.excel);
  }

  back(){
    this.router.navigate(['/incomeform']);
  }

  deleteid(id:any){
    if(confirm("Are you sure want to delete this row"))
     this.dataservice.delete(id).subscribe(data=>{
      //  data = {
      //   responseType: 'text',
      // }
      console.log(data);
      window.location.reload;
      this.router.navigate([''],{ queryParams:{ userId: new Date().getTime()}});
      // this.getdatauser();
    })
    
  }

  edit(data:any){
    this.userservice.setuserdetails(data);
    this.incomeservice.setincomedetails(data);
    this.router.navigate(['/userform'],{queryParams:{updatable:true}});
  }
}
