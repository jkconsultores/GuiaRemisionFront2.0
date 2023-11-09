import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  private url=environment.urlApi;

  constructor(public http:HttpClient) { }

  public login(form:any){
    return this.http.post(this.url+'Session/Login',form);
  }
}
