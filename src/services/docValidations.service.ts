import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';


@Injectable({
    providedIn: 'root'
})
export class DocValidationsService {
    private url=environment.urlApi2;
    constructor(public http:HttpClient) { }

    public obtenerLogin(body:any ){
        return this.http.post<any[]>(this.url+'Session/Login', body);
    }
    
    public getDocValidations( body: any){
        return this.http.post<any>(this.url+'Validation/desde', body);
    }

    public getAllValidations( body: any){
        return this.http.post(this.url+'Validation/all/documents', body);
    }

    public procesar(body: any){
        return this.http.post(this.url+'Validation/document', body);
    }
}