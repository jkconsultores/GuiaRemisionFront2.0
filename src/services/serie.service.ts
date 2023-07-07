import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { serie } from 'src/models/serie';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  private url=environment.urlApi;

  constructor(public http:HttpClient) { }

  public getSerie(){
    return this.http.get<serie[]>(this.url+'AAA/getSerie');
  }
}
