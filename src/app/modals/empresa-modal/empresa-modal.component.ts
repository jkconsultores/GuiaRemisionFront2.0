import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AAA_EMPRESA } from 'src/models/Empresa';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PeriodicElement } from '../destino-modal/destino-modal.component';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-empresa-modal',
  templateUrl: './empresa-modal.component.html',
  styleUrls: ['./empresa-modal.component.css']
})

export class EmpresaModalComponent {
  @Input()
  titulo!:string;
  @Output()  
  submitClicked  = new EventEmitter<AAA_EMPRESA>();
  clickedRows  = new Set<PeriodicElement>();

  constructor(
    
    @Inject(MAT_DIALOG_DATA) public data: AAA_EMPRESA[],
    public dialogRef: MatDialogRef<EmpresaModalComponent>,
    public dialog: MatDialog

    ){console.log(data)}  

    displayedColumns: string[] = ['nombreempresa', 'numerodocumentoemisor', 'paisemisor', 'provinciaemisor', 'options'];
    dataSource = new MatTableDataSource(this.data);

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    onNoClick(){
      this.dialogRef.close();
    }

  ElemntoElegido(dato:any){
    this.clickedRows.clear()
    this.submitClicked.emit(dato)
    this.dialogRef.close();
  }


  editarDireccion(event:AAA_EMPRESA){
  }

  async eliminarDireccion(){
  }
}
