export interface VehiculoCreateDTO {
  usuarioId: number;
  placaVehiculo: string;
  fechaCreacion: Date;
  modelo: string;
  color: string;
  marca: string;
  inscripcionMtc: string | null;
  mtc: string;
}
