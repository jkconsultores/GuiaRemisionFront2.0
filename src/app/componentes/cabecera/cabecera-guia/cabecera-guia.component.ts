import { Component, Input, OnInit } from '@angular/core';
import { MOTIVOS } from 'src/models/Motivos';
import { serie } from 'src/models/serie';
import { MotivosService } from 'src/services/motivos.service';
import { SerieService } from 'src/services/serie.service';

@Component({
  selector: 'app-cabecera-guia',
  templateUrl: './cabecera-guia.component.html',
  styleUrls: ['./cabecera-guia.component.css']
})
export class CabeceraGuiaComponent implements OnInit {
@Input()
tituloGuia:string|undefined;
tablaSeries:serie[] = [];
Motivos:MOTIVOS[] = [];

  constructor(private SerieService:SerieService,private MotivosService:MotivosService){}
  ngOnInit(): void {
    this.SerieService.getSerie().subscribe((res: serie[]) => {
      this.tablaSeries = res;
    });
    this.MotivosService.GetMotivos().subscribe((res:MOTIVOS[])=>{
      this.Motivos= res;
    })
  }

}
