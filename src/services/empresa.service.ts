import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AAA_EMPRESA } from 'src/models/Empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private url=environment.urlApi;

  constructor(public http:HttpClient) { }
  
  public getEmpresas(){
    return this.http.get<AAA_EMPRESA[]>(this.url+'AAA/GetEmpresas');
  }

  public AgregarRelacionEmpresas(body:any){
    return this.http.post(this.url+'Usuario/Agregar/Relacion/empresa',body);
  }
  
}
