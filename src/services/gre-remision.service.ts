import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SPE_DESPATCH } from 'src/models/Spe_Despatch';

@Injectable({
  providedIn: 'root'
})
export class GreRemisionService {

  private url=environment.urlApi;

  constructor(public http:HttpClient) { }

  public emitirGuia(guia:SPE_DESPATCH){
    return this.http.post<any>(this.url+'Spe_Despatch/declarar',guia);
  }
}
