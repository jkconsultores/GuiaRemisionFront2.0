import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReporteGreService {
  private url=environment.urlApi;
  constructor(public http:HttpClient) {}

  public declararGuia(form: any){
    return this.http.post(this.url+'SPE_DESPATCH/declarar',form);
  }
  public getSpe_despatch(desde : string,hasta: string){
    return this.http.get(this.url+'SPE_DESPATCH/SPE_DESPATCH/'+desde+'/'+hasta);
  }
  public getSpe_despatch_item(serie : string){
    return this.http.get(this.url+'SPE_DESPATCH/SPE_DESPATCH_ITEM/'+serie)
  }

}
