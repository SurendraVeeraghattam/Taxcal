import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  databyid: any;
  constructor(private http: HttpClient) { }

  getdata(): Observable<any> {
    return this.http.get('http://localhost:8080/Getdetails');
  }

  download(data: any) {
    return window.open('http://localhost:8080/ExcelData', data);
  }

  downloadById(id: any, data: any) {
    return window.open('http://localhost:8080/ExcelData/' + id, data);
  }

  delete(id: any): Observable<any> {
    // var  options = {Headers,
    //      responseType: 'text',
    //    }
    return this.http.delete('http://localhost:8080/Delete/' + id.userId, { responseType: 'text' });
  }

  datauser(id: any): Observable<any> {
    return this.http.get('http://localhost:8080/Getdetails/' + id);
  }

  update(id: any) {
    return this.http.put('http://localhost:8080/Update/' + id.userId, id);
  }

  getdatabyid() {
    return this.databyid;
  }

  getserverpage(page: number, pageSize: number, searchTerm: string): Observable<any> {
    console.log("i'm in service" + searchTerm);
    console.log(pageSize);
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('pageSize', pageSize.toString());
    params = params.set('userName', searchTerm);

    return this.http.get<any>('http://localhost:8080/pageData', { params });
  }


}
export interface ResponseMessage {
  message: String;
}
