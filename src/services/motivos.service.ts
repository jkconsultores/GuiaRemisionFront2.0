import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { MOTIVOS } from 'src/models/Motivos';
import { serie } from 'src/models/serie';

@Injectable({
  providedIn: 'root'
})
export class MotivosService {

  private url=environment.urlApi;

  constructor(public http:HttpClient) { }

  public GetMotivos(){
    return this.http.get<MOTIVOS[]>(this.url+'Motivos');
  }
}
