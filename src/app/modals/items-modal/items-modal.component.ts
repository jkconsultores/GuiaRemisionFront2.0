import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CreacionItemsModalComponent } from '../creacion-items-modal/creacion-items-modal.component';
import { producto, productoPaginacionDTO } from 'src/models/producto';
import { ProductoService } from 'src/services/producto.service';

@Component({
  selector: 'app-items-modal',
  templateUrl: './items-modal.component.html',
  styleUrls: ['./items-modal.component.css']
})
export class ItemsModalComponent implements OnInit,AfterViewInit {
  ELEMENT_DATA: producto[] = [];
  // @ViewChild(MatPaginator , { static: true }) paginator: MatPaginator;
  cantidad:number=20;
  displayedColumns: string[] = ['name', 'unidad','descripcion', 'Opt'];
  dataSource!: MatTableDataSource<producto>;

  constructor(public dialog: MatDialog,private productosService:ProductoService){
    this.ObtenerProductos(0,50,'');
  }

  ngOnInit(): void {


  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ObtenerProductos(inico:number,cantidad:number,busqueda:string){
    this.productosService.PaginacionYBusqueda(inico,cantidad,busqueda).subscribe((resp:productoPaginacionDTO)=>{
      this.ELEMENT_DATA=resp.productos;
      this.cantidad=resp.totalRegistros
      this.dataSource = new MatTableDataSource<producto>(this.ELEMENT_DATA);
      // this.dataSource.paginator = this.paginator;
    })
  }
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
