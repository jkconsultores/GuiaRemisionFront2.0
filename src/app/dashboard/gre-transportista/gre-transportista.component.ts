import { Component } from '@angular/core';
import moment from 'moment';
import { DestinoDeGre, GreCabecera, TransporteDeGre } from 'src/models/GreObject';
import { SPE_DESPATCH } from 'src/models/Spe_Despatch';
import { GreRemisionService } from 'src/services/gre-remision.service';

@Component({
  selector: 'app-gre-transportista',
  templateUrl: './gre-transportista.component.html',
  styleUrls: ['./gre-transportista.component.css']
})
export class GreTransportistaComponent {
  value = 'Clear me';
  RucEmisor: string = '';
  datosDeGreEnvio: SPE_DESPATCH = { modalidadTraslado: '01' };

  constructor(private greservices:GreRemisionService) {}

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
  chofer2Changed(event: TransporteDeGre) {
    this.datosDeGreEnvio.numeroPlacaVehiculoSec1 = event.Vehiculo?.placaVehiculo;
    this.datosDeGreEnvio.numeroDocumentoConductorSec1 = event.Chofer?.numerodocumentochofer;
    this.datosDeGreEnvio.tipoDocumentoConductorSec1 = event.Chofer?.tipodocumentochofer;

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
  }
  ObservacionChange($event: string|undefined) {
    this.datosDeGreEnvio.observaciones = $event;
  }

}
