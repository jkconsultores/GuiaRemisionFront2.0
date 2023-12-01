import { Component, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentosModalComponent } from 'src/app/modals/documentos-modal/documentos-modal.component';
import { SPE_DESPATCH_ITEM } from 'src/models/SPE_DESPATCH_ITEM';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})

export class DocumentosComponent {
  constructor(public dialog: MatDialog){}
  // submitClicked = new EventEmitter<DocumentosComponent>();
  // ELEMENT_DATA: SPE_DESPATCH_ITEM[] = [];
  // cantidad:number=this.ELEMENT_DATA.length;
  // dataSource: MatTableDataSource<SPE_DESPATCH_ITEM> = new MatTableDataSource<SPE_DESPATCH_ITEM>(this.ELEMENT_DATA);

  openModal(){
    const dialogRef = this.dialog.open(DocumentosModalComponent,{width:'1000px'});
    // dialogRef.componentInstance.submitClicked.subscribe(result => {

    //   let data:SPE_DESPATCH_ITEM={
    //     //  cantidad:'1',
    //     //  codigo:result.codigo,
    //     //  descripcion:result.descripcion,
    //     //  unidadMedida:result.unidadmedida
    //   }
    //   this.ELEMENT_DATA.push(data);
    //   console.log(this.ELEMENT_DATA);
    //   this.dataSource.data = this.ELEMENT_DATA;
    //   this.cantidad=this.ELEMENT_DATA.length

    // });

  }
}
