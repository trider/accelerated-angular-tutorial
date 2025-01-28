import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Optional, Inject } from '@angular/core';



import { Observable } from 'rxjs';
// import { ServicesModuleConfig } from '../services.module';

@Injectable({ providedIn: 'root' })
export class HttpService {



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' 
    
    
    }),

  };

  

  constructor(
    private http: HttpClient,

    ) {
      
     }

   
  public getServiceData(url: any): Observable<any> {
    return this.http.get<any>(url);
  }

  public postServiceData(url: string, payload:any): Observable<any> {
    return this.http.post<any>(url, payload, this.httpOptions);
  }
  




}