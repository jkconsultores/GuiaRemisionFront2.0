export interface origen{
  numerodocumentoemisor:string,
  ubigeoorigen:string,
  direccionorigen:string,
  codigolocalanexo:string
}
export interface Aaa_OrigenDTO
{
    numerodocumentoemisor: string;
    ubigeoorigen: string;
    tienda: string|undefined;
    direccionorigen: string;
    codigolocalanexo: string | null;
    usuarioid: number;
    datestamp: Date;
}
