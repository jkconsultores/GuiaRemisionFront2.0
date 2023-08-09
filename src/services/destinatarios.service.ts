import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DestinatariosService {

  private url=environment.urlApi;

  constructor(private http:HttpClient) { }

  public getDestinatario(){
    return this.http.get(this.url+'GreTransportista/Destinatario')
  }
}
