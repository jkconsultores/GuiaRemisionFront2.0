import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsModalComponent } from 'src/app/modals/items-modal/items-modal.component';
import { SPE_DESPATCH_ITEM } from 'src/models/SPE_DESPATCH_ITEM';

@Component({
  selector: 'app-items-guia',
  templateUrl: './items-guia.component.html',
  styleUrls: ['./items-guia.component.css']
})
export class ItemsGuiaComponent {
  ELEMENT_DATA: SPE_DESPATCH_ITEM[] = [];

  displayedColumns: string[] = ['name', 'unidad','descripcion', 'Opt'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(public dialog: MatDialog){}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialogItems() {
    const dialogRef = this.dialog.open(ItemsModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}