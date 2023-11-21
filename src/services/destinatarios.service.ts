import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { destinatario } from 'src/models/destinatario';

@Injectable({
  providedIn: 'root'
})
export class DestinatariosService {
  private url=environment.urlApi;
  constructor(private http:HttpClient) {}

  public getDestinatario(){
    return this.http.get<destinatario[]>(this.url+'aaa/adquirientes')
  }
  public crearDestinatario(body: any){
    return this.http.post(this.url+'Aaa', body);
  }
  public eliminarDestinatario(body:destinatario ){
    return this.http.post(this.url+'Aaa/Eliminar/adquiriente/'+ body.numerodocumentoadquiriente, body);
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
