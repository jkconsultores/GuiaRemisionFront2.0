export interface producto{
  cantidad:string,
  codigo:string,
  unidadmedida:string,
  descripcion:String
}
export interface productoPaginacionDTO{
  productos:producto[],
  totalRegistros:number,
}
