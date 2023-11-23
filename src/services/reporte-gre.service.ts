import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReporteGreService {
  private url=environment.urlApi;
  constructor(public http:HttpClient) {}

  public getSpe_despatch(desde : String, hasta: String){
    return this.http.get(this.url+'SPE_DESPATCH/SPE_DESPATCH/'+desde+'/'+hasta);
  }

}
