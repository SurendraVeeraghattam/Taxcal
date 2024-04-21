import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeformService {

  incomedata:any;
  constructor(private http:HttpClient) { }

  postform(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/Incomedetails',data);
  }

  setincomedetails(data:any){
    this.incomedata = data;
  }

  getincomedetails(){
     return this.incomedata;
  }
}
