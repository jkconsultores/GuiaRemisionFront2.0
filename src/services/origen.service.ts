import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Aaa_OrigenDTO } from 'src/models/origen';

@Injectable({
  providedIn: 'root'
})
export class OrigenService {

  private url=environment.urlApi;

  constructor(public http:HttpClient) { }

  public ObtenerTodosLosOrigenDeUnAdquiriente(rucAdquiriente:string){
    return this.http.get<Aaa_OrigenDTO[]>(this.url+'Origen/Obtener/Origen/'+rucAdquiriente);
  }
  public EliminarOrigen(destino:Aaa_OrigenDTO ){
    return this.http.post<boolean>(this.url+'Origen/eliminar',destino);
  }
  public AgregarUnOrigen(destino:Aaa_OrigenDTO ){
    return this.http.post<boolean>(this.url+'Origen/agregar',destino);
  }
}
