import { Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {  VehiculoDTO } from 'src/models/Vehiculos';
import { VehiculoService } from 'src/services/vehiculo.service';
import Swal from 'sweetalert2';
import { EditOrigenComponentComponent } from '../origen-modal/edit-origen-component/edit-origen-component.component';
import { EditVehiculoComponentComponent } from './edit-vehiculo-component/edit-vehiculo-component.component';

@Component({
  selector: 'app-vehiculos-modal',
  templateUrl: './vehiculos-modal.component.html',
  styleUrls: ['./vehiculos-modal.component.css']
})
export class VehiculosModalComponent {
  @Input()
  titulo: string='Origenes';
  @Output()
  submitClicked = new EventEmitter<VehiculoDTO>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator
  cantidad: number = 0;

  clickedRows = new Set<VehiculoDTO>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: VehiculoDTO[], public dialogRef: MatDialogRef<VehiculosModalComponent>, public vehiculoService: VehiculoService, public dialog: MatDialog) {  }

  displayedColumns: string[] = ['ubigeo', 'codigolocalanexo', 'direccion', 'numerdoc','numeromtc','mtc', 'options'];
  dataSource = new MatTableDataSource(this.data);

  ngAfterViewInit() {
    setTimeout(() => {
      this.paginator._intl.itemsPerPageLabel = "Items por pagina";
      this.paginator._intl.previousPageLabel = "Pagina anterior";
      this.paginator._intl.nextPageLabel = "Pagina siguiente";
      this.dataSource.paginator = this.paginator;
      this.cantidad=this.data.length;
    },0);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onNoClick() {
    this.dialogRef.close();
  }
  ElemntoElegido(dato: any) {
    this.clickedRows.clear()
    this.submitClicked.emit(dato)
    this.dialogRef.close();
  }
  async eliminarDireccion(event: VehiculoDTO) {
    const result = await Swal.fire({
      title: 'Esta acción no se puede deshacer',
      text: '¿Estás seguro de eliminar el vehiculo con placa: ' + event.placaVehiculo + '?',
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
    this.vehiculoService.deleteVehiculo(event.id.toString()).subscribe(
      (resp: any) => {
        Swal.fire('Destino eliminado satisfactoriamente', '', 'success');
        this.data = this.removerObjetoDeArray(this.data, event);
        this.dataSource = new MatTableDataSource(this.data);
      },
      error => {
        Swal.fire('No se pudo eliminar el destino', '', 'error');
      }
    );
  }
  editarDireccion(event: VehiculoDTO) {
    console.log(event);
    const dialogRef = this.dialog.open(EditVehiculoComponentComponent, {
      data: event, width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.data = this.removerObjetoDeArray(this.data,result.after);
        this.data.push(result.before);
        this.dataSource.data=this.data;
      }
    });
  }

  removerObjetoDeArray(arr: any[], objeto: any): any[] {
    const index = arr.findIndex(item => item === objeto);

    if (index !== -1) {
      arr.splice(index, 1);
    }

    return arr;
  }
  CrearDireccion() {
    let datos: VehiculoDTO = { color: '', inscripcionMtc: '', marca: '', modelo:'', mtc: '', placaVehiculo: '',id :0 };
    const dialogRef = this.dialog.open(EditVehiculoComponentComponent, {
      data: datos!, width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result != undefined) {
        if (result.numerodocumentoemisor.length > 0) {
          this.data.push(result);
          this.dataSource = new MatTableDataSource(this.data);
        }
      }

    });
  }
}
