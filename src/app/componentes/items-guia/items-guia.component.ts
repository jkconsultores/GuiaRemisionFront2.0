import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsModalComponent } from 'src/app/modals/items-modal/items-modal.component';
import { SPE_DESPATCH_ITEM } from 'src/models/SPE_DESPATCH_ITEM';

@Component({
  selector: 'app-items-guia',
  templateUrl: './items-guia.component.html',
  styleUrls: ['./items-guia.component.css']
})
export class ItemsGuiaComponent implements OnInit {
  ELEMENT_DATA: SPE_DESPATCH_ITEM[] = [];
  // @ViewChild('paginator') paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'unidad','descripcion', 'Opt'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);


  constructor(public dialog: MatDialog){}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    // this.dataSource.paginator = this.paginator;
  }

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
