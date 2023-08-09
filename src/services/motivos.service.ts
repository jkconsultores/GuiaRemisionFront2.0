import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { MOTIVOS } from 'src/models/Motivos';
import { T_UnidadMedida } from 'src/models/UnidadMedida';
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
  public GetUnidadesDeMedida(){
    return this.http.get<T_UnidadMedida[]>(this.url+"UnidadMedida");
  }
}
