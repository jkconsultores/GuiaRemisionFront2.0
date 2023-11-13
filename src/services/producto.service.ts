import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { producto, productoPaginacionDTO } from 'src/models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url=environment.urlApi;

  constructor(public http:HttpClient) { }

  public ObtenerTodosLosProductos(rucAdquiriente:string){
    return this.http.get<producto[]>(this.url+'Producto');
  }
  public ObtenerUnProducto(){
    return this.http.get<producto>(this.url+'Producto');
  }
  public EliminarProducto(codigo:string ){
    return this.http.get<boolean>(this.url+'Producto/BorrarProducto/'+codigo);
  }
  public AgregarUnProducto(destino:producto ){
    return this.http.post<producto>(this.url+'Producto/Producto',destino);
  }
  public PaginacionYBusqueda(inicio:number,cantidad:number,busqeda:string){
    let url =''
    if(busqeda!=''){
      url = "?parametroBusqueda="+busqeda
    }
    return this.http.get<productoPaginacionDTO>(this.url+'Producto/'+inicio+"/"+cantidad+url);
  }
}
