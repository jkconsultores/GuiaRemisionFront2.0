import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { EditOrigenComponentComponent } from './edit-origen-component/edit-origen-component.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Aaa_OrigenDTO } from 'src/models/origen';
import { DestinosService } from 'src/services/destinos.service';
import Swal from 'sweetalert2';
import { DestinoModalComponent } from '../destino-modal/destino-modal.component';
import { OrigenService } from 'src/services/origen.service';

@Component({
  selector: 'app-origen-modal',
  templateUrl: './origen-modal.component.html',
  styleUrls: ['./origen-modal.component.css']
})
export class OrigenModalComponent {
  @Input()
  titulo!: string;
  @Output()
  submitClicked = new EventEmitter<Aaa_OrigenDTO>();

  clickedRows = new Set<Aaa_OrigenDTO>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: Aaa_OrigenDTO[], public dialogRef: MatDialogRef<OrigenModalComponent>, public destinoService: OrigenService, public dialog: MatDialog) { }

  displayedColumns: string[] = ['ubigeo', 'codigolocalanexo', 'direccion', 'numerdoc', 'options'];
  dataSource = new MatTableDataSource(this.data);

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
  async eliminarDireccion(event: Aaa_OrigenDTO) {
    const result = await Swal.fire({
      title: 'Esta acción no se puede deshacer',
      text: '¿Estás seguro de eliminar la direccion: ' + event.direccionorigen + '?',
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
    this.destinoService.EliminarOrigen(event).subscribe(
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
  editarDireccion(event: Aaa_OrigenDTO) {
    console.log(event);
    const dialogRef = this.dialog.open(EditOrigenComponentComponent, {
      data: event, width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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
    let datos: Aaa_OrigenDTO = { codigolocalanexo: '', direccionorigen: '', numerodocumentoemisor: '', tienda: '', usuarioid: 0, ubigeoorigen: '', datestamp: new Date() };
    const dialogRef = this.dialog.open(EditOrigenComponentComponent, {
      data: datos!, width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result != undefined) {
        if (result.numerodocumentoadquiriente.length > 0) {
          this.data.push(result);
          this.dataSource = new MatTableDataSource(this.data);
        }
      }

    });
  }
}
