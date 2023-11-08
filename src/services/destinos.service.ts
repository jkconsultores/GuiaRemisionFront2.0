import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AAA_DESTINO } from 'src/models/destino';

@Injectable({
  providedIn: 'root'
})
export class DestinosService {

  private url=environment.urlApi;

  constructor(public http:HttpClient) { }

  public ObtenerTodosLosDestinosDeUnAdquiriente(rucAdquiriente:string){
    return this.http.get<AAA_DESTINO[]>(this.url+'Destinos/Obtener/destinos/'+rucAdquiriente);
  }
  public EliminarDestino(destino:AAA_DESTINO ){
    return this.http.post<boolean>(this.url+'Destinos/eliminar',destino);
  }
  public AgregarUnDestino(destino:AAA_DESTINO ){
    return this.http.post<boolean>(this.url+'Destinos/agregar',destino);
  }
}
