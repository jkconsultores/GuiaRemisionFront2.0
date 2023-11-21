export interface T_Vehiculo {
  id: number;
  usuarioId: number;
  placaVehiculo: string;
  fechaCreacion: string;
  modelo: string;
  color: string;
  marca: string;
}
export interface VehiculoDTO {
  id: number;
  placaVehiculo: string;
  modelo: string;
  color: string;
  marca: string;
  inscripcionMtc: string | null;
  mtc: string;
}
