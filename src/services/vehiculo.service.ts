import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { VehiculoDTO } from 'src/models/Vehiculos';
import { VehiculoCreateDTO } from 'src/models/vehiculoCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private url=environment.urlApi;

  constructor(public http:HttpClient) { }

  public getVehiculos(){
    return this.http.get<VehiculoDTO[]>(this.url+"Vehiculo");
  }
  public addVehiculo(Vehiculo:VehiculoCreateDTO){
    return this.http.post<VehiculoDTO[]>(this.url+"Vehiculo",Vehiculo);
  }
  public deleteVehiculo(idvehiculo:string){
    return this.http.post<VehiculoDTO>(this.url+"Vehiculo/delete/"+idvehiculo,null);
  }
  public updateVehiculo(vehiculo:VehiculoDTO){
    return this.http.post<VehiculoDTO>(this.url+"Vehiculo/update",vehiculo);
  }
}
