import { Component, Input, OnInit } from '@angular/core';
import { DestinatariosService } from 'src/services/destinatarios.service';

@Component({
  selector: 'app-destinatario-guia',
  templateUrl: './destinatario-guia.component.html',
  styleUrls: ['./destinatario-guia.component.css']
})
export class DestinatarioGuiaComponent implements OnInit{

@Input()
RucEmisor!:string

  Destinos:any;
  RucAdquiriente:string='';
  constructor(private destinosService:DestinatariosService){}

  ngOnInit(): void {
    this.ObtenerDestinatario();
  }

  ObtenerDestinatario(){
    this.destinosService.getDestinatario().subscribe((res:any)=>{
      this.Destinos=res;
    })
  }
}
