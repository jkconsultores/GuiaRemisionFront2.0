import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { docReferenciado } from 'src/models/docRef';


@Injectable({
    providedIn: 'root'
})

export class DocumentoService {
    private url=environment.urlApi;
    constructor(public http:HttpClient) { }
    
    public getDocReferenciado( ){
        return this.http.get<docReferenciado[]>(this.url+'Chofer/Obtener/todos/choferes');
    }

    public getAllValidations( body: any){
        return this.http.post(this.url+'Validation/all/documents', body);
    }

    public procesar(body: any){
        return this.http.post(this.url+'Validation/document', body);
    }
}