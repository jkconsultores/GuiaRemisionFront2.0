import { DocumentosComponent } from "src/app/componentes/documentos/documentos.component";
import { SPE_DESPATCH_ITEM } from "./SPE_DESPATCH_ITEM";

export interface SPE_DESPATCH {
    tipoDocumentoRemitente?: string;
    tipoDocumentoRemision?: string | null;
    numeroDocumentoRemitente?: string;
    numeroDocumentoRemision?: string | null;
    serieNumeroGuia?: string;
    tipoDocumentoGuia?: string | null;
    bl_estadoRegistro?: string | null;
    bl_reintento?: number;
    bl_origen?: string | null;
    bl_hasFileResponse?: number | null;
    fechaEmisionGuia?: string | null;
    observaciones?: string | null;
    razonSocialRemitente?: string | null;
    correoRemitente?: string | null;
    correoDestinatario?: string | null;
    serieGuiaBaja?: string | null;
    codigoGuiaBaja?: string | null;
    tipoGuiaBaja?: string | null;
    numeroDocumentoRelacionado?: string | null;
    codigoDocumentoRelacionado?: string | null;
    numeroDocumentoDestinatario?: string | null;
    tipoDocumentoDestinatario?: string | null;
    razonSocialDestinatario?: string | null;
    numeroDocumentoEstablecimiento?: string | null;
    tipoDocumentoEstablecimiento?: string | null;
    razonSocialEstablecimiento?: string | null;
    motivoTraslado?: string | null;
    descripcionMotivoTraslado?: string | null;
    indTransbordoProgramado?: string | null;
    pesoBrutoTotalBienes?: string | null;
    unidadMedidaPesoBruto?: string | null;
    modalidadTraslado?: string | null;
    fechaInicioTraslado?: string | null;
    numeroRucTransportista?: string | null;
    tipoDocumentoTransportista?: string | null;
    razonSocialTransportista?: string | null;
    numeroDocumentoConductor?: string | null;
    tipoDocumentoConductor?: string | null;
    numeroPlacaVehiculoPrin?: string | null;
    numeroBultos?: string | null;
    numeroContenedor1?: string | null;
    ubigeoPtoLLegada?: string | null;
    direccionPtoLLegada?: string | null;
    ubigeoPtoPartida?: string | null;
    direccionPtoPartida?: string | null;
    codigoPuerto?: string | null;
    idEntrega?: string | null;
    horaEmisionGuia?: string | null;
    numeroPlacaVehiculoSec1?: string | null;
    bL_SOURCEFILE?: string | null;
    bl_createdAt?: string | null;
    numeroAutorizacionRem?: string | null;
    codigoAutorizadoRem?: string | null;
    tipoDocumentoComprador?: string | null;
    numeroDocumentoComprador?: string | null;
    razonSocialComprador?: string | null;
    pesoBrutoTotalItem?: string | null;
    unidadMedidaPesoBrutoItem?: string | null;
    sustentoPesoBrutoTotal?: string | null;
    numeroPrecinto1?: string | null;
    numeroContenedor2?: string | null;
    numeroPrecinto2?: string | null;
    fechaEntregaBienes?: string | null;
    indRetornoVehiculoEnvaseVacio?: string | null;
    indTrasVehiculoCatM1L?: string | null;
    indRegVehiculoyCond?: string | null;
    indRetornoVehiculoVacio?: string | null;
    indTrasladoTotalDAMoDS?: string | null;
    tipoEvento?: string | null;
    numeroRegistroMTC?: string | null;
    numeroAutorizacionTrans?: string | null;
    codigoAutorizadoTrans?: string | null;
    tarjetaUnicaCirculacionPrin?: string | null;
    numeroAutorizacionVehPrin?: string | null;
    codigoAutorizadoVehPrin?: string | null;
    numeroPlacaVehiculoSec2?: string | null;
    tarjetaUnicaCirculacionSec1?: string | null;
    tarjetaUnicaCirculacionSec2?: string | null;
    numeroAutorizacionVehSec1?: string | null;
    numeroAutorizacionVehSec2?: string | null;
    codigoAutorizadoVehSec1?: string | null;
    codigoAutorizadoVehSec2?: string | null;
    nombreConductor?: string | null;
    apellidoConductor?: string | null;
    numeroLicencia?: string | null;
    numeroDocumentoConductorSec1?: string | null;
    tipoDocumentoConductorSec1?: string | null;
    nombreConductorSec1?: string | null;
    apellidoConductorSec1?: string | null;
    numeroLicenciaSec1?: string | null;
    numeroDocumentoConductorSec2?: string | null;
    tipoDocumentoConductorSec2?: string | null;
    nombreConductorSec2?: string | null;
    apellidoConductorSec2?: string | null;
    numeroLicenciaSec2?: string | null;
    numeroDocumentoPtoLlegada?: string | null;
    codigoPtollegada?: string | null;
    ptoLlegadaLongitud?: string | null;
    ptoLlegadaLatitud?: string | null;
    numeroDocumentoPtoPartida?: string | null;
    codigoPtoPartida?: string | null;
    ptoPartidaLongitud?: string | null;
    ptoPartidaLatitud?: string | null;
    tipoLocacion?: string | null;
    codigoAeropuerto?: string | null;
    indPagadorFlete?: string | null;
    tipoDocumentoTercero?: string | null;
    numeroDocumentoTercero?: string | null;
    razonSocialTercero?: string | null;
    nombrePuertoAeropuerto?: string | null;
    textoAuxiliar250_1?: string | null;
    textoAuxiliar250_2?: string | null;
    textoAuxiliar250_3?: string | null;
    textoAuxiliar250_4?: string | null;
    textoAuxiliar250_5?: string | null;
    textoAuxiliar250_6?: string | null;
    textoAuxiliar250_7?: string | null;
    textoAuxiliar250_8?: string | null;
    textoAuxiliar250_9?: string | null;
    codigoAuxiliar250_1?: string | null;
    codigoAuxiliar250_2?: string | null;
    codigoAuxiliar250_3?: string | null;
    codigoAuxiliar250_4?: string | null;
    codigoAuxiliar250_5?: string | null;
    codigoAuxiliar250_6?: string | null;
    codigoAuxiliar250_7?: string | null;
    codigoAuxiliar250_8?: string | null;
    codigoAuxiliar250_9?: string | null;
    numeroDocSubcontratista?: string | null;
    razonSocialSubcontratista?: string | null;
    tipoDocumentoSubcontratista?: string | null;
    sPE_DESPATCH_ITEM?: SPE_DESPATCH_ITEM[] | null;
    sPE_DESPATCH_DOCRELACIONADO?: SPE_DESPATCH_DOCRELACIONADO[] | null;
    camposOpcionales1?: LogEnvioGuiaUsuarioDTO | null;
    datosDeTrasporteTercerizado?: DatosDeTrasporteTercerizado | null;
    documentosRef?: DocumentosComponent | null;
}
export interface SPE_DESPATCH_DOCRELACIONADO {
  numeroDocumentoRemision: string | null;
  tipoDocumentoGuia: string | null;
  tipoDocumentoRemision: string | null;
  serieNumeroGuia: string | null;
  ordenDocRel: string | null;
  tipoDocumentoDocRel: string | null;
  codigoDocumentoDocRel: string | null;
  numeroDocumentoDocRel: string | null;
  numeroDocumentoEmisorDocRel: string | null;
  tipoDocumentoEmisorDocRel: string | null;
}
export interface LogEnvioGuiaUsuarioDTO {
  tipo: string | null;
  almacen: string | null;
  referencia: string | null;
  servicio: string | null;
  ticket: string | null;
}
export interface DatosDeTrasporteTercerizado {
  indTransporteSubcontratado: boolean | null;
  tipoDocumentoSubcontratista: string | null;
  numeroDocSubcontratista: string | null;
  razonSocialSubcontratista: string | null;
}
