import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserformService {

  userdata:any;

  constructor(private http:HttpClient) { }

  postform(data:any):Observable<any> {
    return this.http.post('http://localhost:8080/Details',data);
  }

  getform():Observable<any>{
    return this.http.get('http://localhost:8080/Getdetails');
  }

  setuserdetails(data:any){
    this.userdata = data;
  }

  getuserdetails(){
    return this.userdata
  }
}
