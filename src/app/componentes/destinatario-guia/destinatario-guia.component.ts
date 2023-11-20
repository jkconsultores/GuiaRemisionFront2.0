import { Component, Input, OnInit } from '@angular/core';
import { DestinatarioModalComponent } from 'src/app/modals/destinatario-modal/destinatario-modal.component';
import { DestinatariosService } from 'src/services/destinatarios.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { destinatario } from 'src/models/destinatario';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-destinatario-guia',
  templateUrl: './destinatario-guia.component.html',
  styleUrls: ['./destinatario-guia.component.css']
})

export class DestinatarioGuiaComponent implements OnInit{
  [x: string]: any;

  @Input()
  RucEmisor!:string
  Destinos:any;
  myControl = new FormControl();
  Destinatario:any;
  RucAdquiriente:string='';
  filteredOptions!: Observable<destinatario[]>;

  constructor(
    public dialog: MatDialog,
    private destinosService:DestinatariosService){
  }

  ngOnInit(): void {
    this.ObtenerDestinatario();
  }

  onSelectionChange(event: any){
  }

  AbrirModalDestinatario(){    
    const dialogRef = this.dialog.open(DestinatarioModalComponent, {      
      data: this.Destinatario,width:'1000px'
    });

    dialogRef.componentInstance.submitClicked.subscribe(result => {
      this.myControl.setValue(result);
    });
  }

  ObtenerDestinatario(){
    this.destinosService.getDestinatario().subscribe((res:any)=>{
      this.Destinatario=res;
    })
  }

  displayFn(data: destinatario): string {
    return data && data.razonsocialadquiriente ? data.razonsocialadquiriente : '';
  }
}
