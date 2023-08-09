import { Component, OnInit } from '@angular/core';
import { DestinatariosService } from 'src/services/destinatarios.service';

@Component({
  selector: 'app-destinatario-guia',
  templateUrl: './destinatario-guia.component.html',
  styleUrls: ['./destinatario-guia.component.css']
})
export class DestinatarioGuiaComponent implements OnInit{

  Destinos:any;

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
