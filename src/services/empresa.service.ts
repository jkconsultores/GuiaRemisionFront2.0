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
    return this.http.get<AAA_EMPRESA[]>(this.url+'Empresa/GetEmpresas');
  }
  public crearEmpresa(body: any){
    return this.http.post(this.url+'Empresa/empresa', body);
  }
  public eliminarEmpresa(body:AAA_EMPRESA ){
    return this.http.get<any>(this.url+'Empresa/BorrarEmpresa/'+ body.numerodocumentoemisor);
  }
  public AgregarRelacionEmpresas(body:any){
    return this.http.post(this.url+'Usuario/Agregar/Relacion/empresa',body);
  }
  public getPais() {
    return this.http.get<any>(this.url+'Nacionalidad');
  }
  public getDepartamento() {
    return this.http.get<any>(this.url+'Nacionalidad/Departamento/111');
  } 
  public getProvincia(id: string) {
    return this.http.get<any>(this.url+'Nacionalidad/Provincia/'+ id);
  } 
  public getDistrito(id: string, id2: string) {
    return this.http.get<any>(this.url+'Nacionalidad/Distrito/'+ id + '/' + id2);
  }
  public getUbigeo(id: string, id2: string, id3:string) {
    return this.http.get(this.url+'Nacionalidad/Ubigeo/'+ id + '/' + id2 + '/' + id3, {
      responseType: 'text'
    });
  }
  
}
