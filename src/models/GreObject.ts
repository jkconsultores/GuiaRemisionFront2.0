import { AAA_EMPRESA } from "./Empresa";
import { VehiculoDTO } from "./Vehiculos";
import { adquiriente } from "./adquiriente";
import { chofer } from "./choferSec";
import { destinatario } from "./destinatario";
import { AAA_DESTINO } from "./destino";
import { Aaa_OrigenDTO } from "./origen";
import { transportista } from "./transportista";

export interface GreCabecera{
  empresa?:AAA_EMPRESA,
  transporte?:transportista,
  Origen?:Aaa_OrigenDTO,
  Serie?:string,
  FechaEmision?:Date,
  FechaVencimiento?:Date,
  Modalidad?:string,
  motivo?:string,
  NroBultos?:number,
  PesoBruto?:number,
  UnidadDePeso?:string,
  Descripcionmotivo?:string
}
export interface DestinoDeGre{
  Adquiriente?:destinatario,
  Destino?:AAA_DESTINO
}
export interface TransporteDeGre{
  Chofer?:chofer,
  Vehiculo?:VehiculoDTO
}
