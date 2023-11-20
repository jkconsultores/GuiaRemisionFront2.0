import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { chofer } from 'src/models/choferSec';

@Injectable({
  providedIn: 'root'
})

export class ChoferService {

  private url=environment.urlApi;

  constructor(private http:HttpClient) { }

  public getChofer(){
    return this.http.get<chofer[]>(this.url+'Chofer/Obtener/todos/choferes');
  }
  public crearChofer(body: any){
    return this.http.post(this.url+'Chofer/chofer', body);
  }
  public eliminarChofer(body:chofer ){
    return this.http.get(this.url+'Chofer/BorrarChofer/'+ body.numerodocumentochofer);
  }
}
