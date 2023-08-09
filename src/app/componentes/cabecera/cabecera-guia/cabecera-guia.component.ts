import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { MOTIVOS } from 'src/models/Motivos';
import { T_UnidadMedida } from 'src/models/UnidadMedida';
import { serie } from 'src/models/serie';
import { DestinatariosService } from 'src/services/destinatarios.service';
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
Destinos:any;

public unidadesDeMedida:T_UnidadMedida[] = [];
stateCtrl = new FormControl('');
public filteredOptions: Observable<T_UnidadMedida[]> | undefined;

  constructor(private SerieService:SerieService,private MotivosService:MotivosService,private motivosService:MotivosService,private destinosService:DestinatariosService){}
  ngOnInit(): void {
    this.SerieService.getSerie().subscribe((res: serie[]) => {
      this.tablaSeries = res;
    });
    this.MotivosService.GetMotivos().subscribe((res:MOTIVOS[])=>{
      this.Motivos= res;
    })
    this.motivosService.GetUnidadesDeMedida().subscribe((resp:any)=>{
      this.unidadesDeMedida=resp;
    })
    this.filteredOptions = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(unidades => (unidades ? this._filter(unidades) : this.unidadesDeMedida.slice())),
    );
  }

  private _filter(value: string): T_UnidadMedida[] {
    const filterValue = value.toLowerCase();

    return this.unidadesDeMedida.filter(option => option.descripcion.toLowerCase().includes(filterValue) || option.valor.toLowerCase().includes(filterValue));
  }
}
