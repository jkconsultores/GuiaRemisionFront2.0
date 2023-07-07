import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SPE_DESPATCH_ITEM } from 'src/models/SPE_DESPATCH_ITEM';
import { CreacionItemsModalComponent } from '../creacion-items-modal/creacion-items-modal.component';

@Component({
  selector: 'app-items-modal',
  templateUrl: './items-modal.component.html',
  styleUrls: ['./items-modal.component.css']
})
export class ItemsModalComponent {
  ELEMENT_DATA: SPE_DESPATCH_ITEM[] = [];

  displayedColumns: string[] = ['name', 'unidad','descripcion', 'Opt'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(public dialog: MatDialog){}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialogItems() {
    const dialogRef = this.dialog.open(CreacionItemsModalComponent, {
      data: {codigo:'',unidadMedida:'',descripcion:''},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined){
        let data = this.dataSource.data;
        data.push(result);
        this.dataSource.data=data;
      }
    });
  }
}
