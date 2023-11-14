export interface producto{
  id?:number,
  cantidad:string,
  codigo:string,
  unidadmedida:string,
  descripcion:string
}
export interface productoPaginacionDTO{
  productos:producto[],
  totalRegistros:number,
}
