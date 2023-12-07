import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConsultaSunatService {
  private url=environment.urlApi3;
  constructor(public http:HttpClient) { }

  public obtenerLogin(body:any ){
    debugger;
    return this.http.post<any[]>(this.url+'Session/Login/platafroma', body);
  }

  public getDocumentosSunat(resp: any, body: any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization', 'Bearer ' + resp.token);
    let options : any;
    options = { headers: headers };
    return this.http.post<any>(this.url+'Consultas', body);
  }

}
