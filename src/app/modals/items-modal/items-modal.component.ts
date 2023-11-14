import { AfterViewInit, Component, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CreacionItemsModalComponent } from '../creacion-items-modal/creacion-items-modal.component';
import { producto, productoPaginacionDTO } from 'src/models/producto';
import { ProductoService } from 'src/services/producto.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AAA_DESTINO } from 'src/models/destino';
import { ItemsGuiaComponent } from 'src/app/componentes/items-guia/items-guia.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-items-modal',
  templateUrl: './items-modal.component.html',
  styleUrls: ['./items-modal.component.css']
})
export class ItemsModalComponent implements AfterViewInit {
  @Output()
  submitClicked = new EventEmitter<producto>();
  ELEMENT_DATA: producto[] = [];
  // @ViewChild(MatPaginator , { static: true }) paginator: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator
  cantidad: number = 20;
  displayedColumns: string[] = ['name', 'unidad', 'descripcion', 'Opt'];
  dataSource: MatTableDataSource<producto> = new MatTableDataSource<producto>(this.ELEMENT_DATA);


  constructor(public dialog: MatDialog, private productosService: ProductoService, public dialogRef: MatDialogRef<ItemsGuiaComponent>) {
    this.ObtenerProductos(0, 50, '');
  }


  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = "Items por pagina";
    this.paginator._intl.previousPageLabel = "Pagina anterior";
    this.paginator._intl.nextPageLabel = "Pagina siguiente";
    this.dataSource.paginator = this.paginator;
  }

  ObtenerProductos(inico: number, cantidad: number, busqueda: string) {
    this.productosService.PaginacionYBusqueda(inico, cantidad, busqueda).subscribe((resp: productoPaginacionDTO) => {
      this.ELEMENT_DATA = resp.productos;
      this.cantidad = resp.totalRegistros
      this.dataSource.data = resp.productos;
      // this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ObtenerProductosSegundallamada(0, 50, filterValue.trim())
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialogItems() {
    const dialogRef = this.dialog.open(CreacionItemsModalComponent, {
      data: { codigo: '', unidadMedida: '', descripcion: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let data = this.dataSource.data;
        data.push(result);
        this.dataSource.data = data;
      }
    });
  }
  yourHandler(page: any, pagesize: any) {
    let cantidadDeRegistros = (page + 1) * pagesize;
    console.log("pagina: " + page + " Tamaño de pagina: " + pagesize)
    console.log("Cantidad de registros cosnumidos" + cantidadDeRegistros);

    if (cantidadDeRegistros == this.ELEMENT_DATA.length - 5 || cantidadDeRegistros > this.ELEMENT_DATA.length - 5) {
      this.ObtenerProductosSegundallamada(cantidadDeRegistros + 5, 50, this.dataSource.filter)

    }

  }
  ObtenerProductosSegundallamada(inico: number, cantidad: number, busqueda: string) {
    this.productosService.PaginacionYBusqueda(inico, cantidad, busqueda).subscribe((resp: productoPaginacionDTO) => {
      if(inico==0){
        this.ELEMENT_DATA=resp.productos;
      }else{
      this.ELEMENT_DATA.push(...resp.productos);
      }
      this.cantidad = resp.totalRegistros
      this.dataSource.data = this.ELEMENT_DATA;
      console.log(this.ELEMENT_DATA)
    })
  }
  editarProducto(_t63: producto) {
    const dialogRef = this.dialog.open(CreacionItemsModalComponent, {
      data: _t63,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.ELEMENT_DATA= this.removerObjetoDeArray(this.ELEMENT_DATA, result.last);
        this.ELEMENT_DATA.push(result.end);
        this.dataSource.data =  this.ELEMENT_DATA;
      }
    });
  }
  async eliminarProducto(event: producto) {
    const result = await Swal.fire({
      title: 'Esta acción no se puede deshacer',
      text: '¿Estás seguro de eliminar el producto: ' + event.descripcion + '?',
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
    this.productosService.EliminarProducto(event.codigo).subscribe(
      (resp: any) => {
        Swal.fire('Destino eliminado satisfactoriamente', '', 'success');
        this.ELEMENT_DATA= this.removerObjetoDeArray(this.ELEMENT_DATA, event);
        this.dataSource.data=this.ELEMENT_DATA;
      },
      error => {
        Swal.fire('No se pudo eliminar el destino', '', 'error');
      }
    );
  }
  ElemntoElegido(_t52: any) {
    this.submitClicked.emit(_t52)
    this.dialogRef.close();
  }
  removerObjetoDeArray(arr: any[], objeto: any): any[] {
    const index = arr.findIndex(item => item === objeto);

    if (index !== -1) {
      arr.splice(index, 1);
    }

    return arr;
  }
}
