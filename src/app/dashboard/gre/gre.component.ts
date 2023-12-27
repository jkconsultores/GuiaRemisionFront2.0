import { Component } from '@angular/core';
import { DestinoDeGre, GreCabecera, TransporteDeGre } from 'src/models/GreObject';
import { SPE_DESPATCH } from 'src/models/Spe_Despatch';
import * as moment from 'moment';
import { SPE_DESPATCH_ITEM } from 'src/models/SPE_DESPATCH_ITEM';
import Swal from 'sweetalert2';
import { GreRemisionService } from 'src/services/gre-remision.service';
import { DocumentosComponent } from 'src/app/componentes/documentos/documentos.component';

@Component({
  selector: 'app-gre',
  templateUrl: './gre.component.html',
  styleUrls: ['./gre.component.css']
})

export class GreComponent {
  value = 'Clear me';
  RucEmisor: string = '';
  datosDeGreEnvio: SPE_DESPATCH = { modalidadTraslado: '01' };

  constructor(private greservices:GreRemisionService) { }

  AdquirienteData(event: DestinoDeGre) {
    this.datosDeGreEnvio.tipoDocumentoDestinatario = event.Adquiriente?.tipodocumentoadquiriente;
    this.datosDeGreEnvio.numeroDocumentoDestinatario = event.Adquiriente?.numerodocumentoadquiriente;
    this.datosDeGreEnvio.razonSocialDestinatario = event.Adquiriente?.razonsocialadquiriente;
    this.datosDeGreEnvio.correoDestinatario = event.Adquiriente?.correo;
    this.datosDeGreEnvio.ubigeoPtoLLegada = event.Destino?.ubigeodestino;
    this.datosDeGreEnvio.direccionPtoLLegada = event.Destino?.direcciondestino;
    this.datosDeGreEnvio.codigoPtollegada = event.Destino?.codigolocalanexo;
    this.datosDeGreEnvio.numeroDocumentoPtoLlegada = event.Destino?.numerodocumentoadquiriente;
  }
  CabeceraData(event: GreCabecera) {
    this.datosDeGreEnvio.horaEmisionGuia = moment(event.FechaEmision).format("HH:mm:ss");
    this.datosDeGreEnvio.fechaEmisionGuia = moment(event.FechaEmision).format("YYYY-MM-DD");
    this.datosDeGreEnvio.tipoDocumentoRemitente = event.empresa?.tipodocumentoemisor;
    this.datosDeGreEnvio.numeroDocumentoRemitente = event.empresa?.numerodocumentoemisor;
    this.datosDeGreEnvio.razonSocialRemitente = event.empresa?.razonsocialemisor;
    this.datosDeGreEnvio.correoRemitente = '-';
    this.datosDeGreEnvio.direccionPtoPartida = event.Origen?.direccionorigen;
    this.datosDeGreEnvio.unidadMedidaPesoBruto = event.UnidadDePeso;
    this.datosDeGreEnvio.pesoBrutoTotalBienes = event.PesoBruto?.toString();
    this.datosDeGreEnvio.modalidadTraslado = event.Modalidad;
    this.datosDeGreEnvio.motivoTraslado = event.motivo;
    this.datosDeGreEnvio.numeroBultos = event.NroBultos?.toString();
    this.datosDeGreEnvio.serieNumeroGuia = event.Serie;
    this.datosDeGreEnvio.fechaInicioTraslado = moment(event.FechaEmision).format("YYYY-MM-DD");
    this.datosDeGreEnvio.ubigeoPtoPartida = event.Origen?.ubigeoorigen;
    this.datosDeGreEnvio.codigoPtoPartida = event.Origen?.codigolocalanexo;
    this.datosDeGreEnvio.descripcionMotivoTraslado = event.Descripcionmotivo;
  }
  chofer2Changed(event: TransporteDeGre) {
    this.datosDeGreEnvio.numeroPlacaVehiculoSec1 = event.Vehiculo?.placaVehiculo;
    this.datosDeGreEnvio.numeroDocumentoConductorSec1 = event.Chofer?.numerodocumentochofer;
    this.datosDeGreEnvio.tipoDocumentoConductorSec1 = event.Chofer?.tipodocumentochofer;
    // this.datosDeGreEnvio.numeroRucTransportista = event.Chofer?.numerodocumentochofer;
    // this.datosDeGreEnvio.tipoDocumentoTransportista = event.Chofer?.tipodocumentochofer;
    // this.datosDeGreEnvio.razonSocialTransportista = event.Chofer?.nombre;
  }
  chofer1Changed(event: TransporteDeGre) {
    this.datosDeGreEnvio.numeroPlacaVehiculoPrin = event.Vehiculo?.placaVehiculo;
    this.datosDeGreEnvio.numeroDocumentoConductor = event.Chofer?.numerodocumentochofer;
    this.datosDeGreEnvio.tipoDocumentoConductor = event.Chofer?.tipodocumentochofer;
    this.datosDeGreEnvio.nombreConductor = event.Chofer?.nombre;
    this.datosDeGreEnvio.apellidoConductor= event.Chofer?.apellido;
    this.datosDeGreEnvio.tipoDocumentoConductor = event.Chofer?.tipodocumentochofer;
    this.datosDeGreEnvio.numeroDocumentoConductor= event.Chofer?.numerodocumentochofer;
    this.datosDeGreEnvio.tarjetaUnicaCirculacionPrin= event.Vehiculo?.inscripcionMtc;
    // this.datosDeGreEnvio.numeroRucTransportista = event.Chofer?.numerodocumentochofer;
    // this.datosDeGreEnvio.tipoDocumentoTransportista = event.Chofer?.tipodocumentochofer;
    // this.datosDeGreEnvio.razonSocialTransportista = event.Chofer?.nombre;
  }
  ItemsChange(event: SPE_DESPATCH_ITEM[]) {
    this.datosDeGreEnvio.sPE_DESPATCH_ITEM = event;
  }

  ObservacionChange($event: string|undefined) {
    this.datosDeGreEnvio.observaciones = $event;
  }

  DocChange() {
    
  }

  emitrAlerta(title: string, texto: string, icon: any) {
    Swal.fire(title, texto, icon);
  }

  EmitirGuia() {
    if (!this.validarCampo("remitente", this.datosDeGreEnvio.numeroDocumentoRemitente)) return;
    if (!this.validarCampo("dirección de punto de partida", this.datosDeGreEnvio.direccionPtoPartida)) return;
    if (!this.validarCampo("serie de la guía", this.datosDeGreEnvio.serieNumeroGuia)) return;
    if (!this.validarCampo("modalidad de traslado", this.datosDeGreEnvio.modalidadTraslado)) return;
    if (!this.validarCampo("motivo de traslado", this.datosDeGreEnvio.motivoTraslado)) return;
    if (!this.validarCampoInput("peso bruto total de los bienes", this.datosDeGreEnvio.pesoBrutoTotalBienes)) return;
    if (!this.validarCampo("unidad de medida del peso bruto", this.datosDeGreEnvio.unidadMedidaPesoBruto)) return;
    if (!this.validarCampo("destinatario", this.datosDeGreEnvio.numeroDocumentoDestinatario)) return;
    if (!this.validarCampo("dirección de punto de llegada", this.datosDeGreEnvio.direccionPtoLLegada)) return;

    if (this.datosDeGreEnvio.modalidadTraslado !== '03') {
      if (!this.validarCampo("placa de vehículo principal", this.datosDeGreEnvio.numeroPlacaVehiculoPrin)) return;
      if (!this.validarCampo("número de documento del conductor", this.datosDeGreEnvio.numeroDocumentoConductor)) return;
    }

    if (!this.validarItems()) return;

    // Si pasa todas las validaciones, realiza la acción de enviar
    console.log(this.datosDeGreEnvio.sPE_DESPATCH_ITEM);
    // this.emitrAlerta("Enviando", "Espere un momento", "info");
    this.greservices.emitirGuia(this.datosDeGreEnvio).subscribe((res:any)=>{
      console.log(res)
      Swal.fire("Exito", res, "success")
    },error=>{
      console.log(error)
      Swal.fire("Error", error.error, "error")
    });
    console.log(this.datosDeGreEnvio);
  }

  validarCampo(nombreCampo: string, valor: any): boolean {
    if (valor === undefined) {
      this.emitrAlerta("Alto", `Seleccione ${nombreCampo}`, "warning");
      return false;
    }
    return true;
  }
  validarCampoInput(nombreCampo: string, valor: any): boolean {
    if (valor === undefined) {
      this.emitrAlerta("Alto", `Ingrese el ${nombreCampo}`, "warning");
      return false;
    }
    return true;
  }

  validarItems(): boolean {
    if (this.datosDeGreEnvio.sPE_DESPATCH_ITEM === undefined || this.datosDeGreEnvio.sPE_DESPATCH_ITEM?.length === 0) {
      this.emitrAlerta("Alto", "Debe agregar al menos un item", "warning");
      return false;
    }
    return true;
  }
}
