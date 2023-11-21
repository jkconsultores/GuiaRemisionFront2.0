import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsModalComponent } from 'src/app/modals/items-modal/items-modal.component';
import { SPE_DESPATCH_ITEM } from 'src/models/SPE_DESPATCH_ITEM';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-items-guia',
  templateUrl: './items-guia.component.html',
  styleUrls: ['./items-guia.component.css']
})
export class ItemsGuiaComponent implements OnInit,AfterViewInit {
  @Output()
  submitClicked = new EventEmitter<SPE_DESPATCH_ITEM[]>();
  ELEMENT_DATA: SPE_DESPATCH_ITEM[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator
cantidad:number=this.ELEMENT_DATA.length;
  displayedColumns: string[] = ['name', 'cantidad','unidad','descripcion', 'Opt'];
  dataSource: MatTableDataSource<SPE_DESPATCH_ITEM> = new MatTableDataSource<SPE_DESPATCH_ITEM>(this.ELEMENT_DATA);

  constructor(public dialog: MatDialog){}

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = "Items por pagina";
    this.paginator._intl.previousPageLabel = "Pagina anterior";
    this.paginator._intl.nextPageLabel = "Pagina siguiente";
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialogItems() {
    const dialogRef = this.dialog.open(ItemsModalComponent,{width:'1000px'});

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
    dialogRef.componentInstance.submitClicked.subscribe(result => {

      let dat:SPE_DESPATCH_ITEM={
         cantidad:'1',
         codigo:result.codigo,
         descripcion:result.descripcion,
         unidadMedida:result.unidadmedida
      }
      this.ELEMENT_DATA.push(dat);
      console.log(this.ELEMENT_DATA);
      this.dataSource.data = this.ELEMENT_DATA;
      this.cantidad=this.ELEMENT_DATA.length
      this.emitirItems();
    });
  }
  emitirItems(){
    this.submitClicked.emit(this.ELEMENT_DATA);
  }
  async eliminarProducto(data:SPE_DESPATCH_ITEM){
    const result = await Swal.fire({
      title: 'Alto!',
      text: '¿Estás seguro de retirar el producto: ' + data.descripcion + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      cancelButtonColor: 'red',
      confirmButtonColor: 'green'
    });
    if (!result.isConfirmed) {
      return;
    }
    this.ELEMENT_DATA=this.removerObjetoDeArray(this.ELEMENT_DATA,data)
    this.dataSource.data = this.ELEMENT_DATA;
    this.emitirItems();
  }
  removerObjetoDeArray(arr: any[], objeto: any): any[] {
    const index = arr.findIndex(item => item === objeto);

    if (index !== -1) {
      arr.splice(index, 1);
    }

    return arr;
  }
}
