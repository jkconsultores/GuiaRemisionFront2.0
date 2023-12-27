import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConsultaSunatService {
  private url=environment.urlApi;
  constructor(public http:HttpClient) { }

  public obtenerLogin(body:any ){
    return this.http.post<any[]>(this.url+'Session/Login/platafroma', body);
  }

  public postReporteSunat(body: any){
    return this.http.post<any>(this.url+'Consultas/ReporteSunat', body);
  }

  public getPeriodoTributario(periodotributario: any) {
    return this.http.get<any>(this.url+'Consultas/Diferencias/'+ periodotributario);
  }

  public getPeriodoMes(periodotributario: any) {
    return this.http.get<any>(this.url+'Sire/Periodo/'+ periodotributario);
  }

}
