import { Injectable } from '@angular/core';
import { AuthServiceServiceService } from './auth-service-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { T_MenuGre } from 'src/models/T_menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private url=environment.urlApi;

  httpOptions:any |undefined
  constructor(public http:HttpClient,private auth:AuthServiceServiceService) {}

  public getMenu(){
    return this.http.get<T_MenuGre[]>(this.url+'MenuGre');
  }
}
