import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { USUARIO } from 'src/models/Usuarios';
import { AAA_DESTINO } from 'src/models/destino';
import { DestinosService } from 'src/services/destinos.service';
import Swal from 'sweetalert2';
import { EditDestinoComponentComponent } from './edit-destino-component/edit-destino-component.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-destino-modal',
  templateUrl: './destino-modal.component.html',
  styleUrls: ['./destino-modal.component.css']
})
export class DestinoModalComponent {
@Input()
titulo:string='Destinos';
@Output()
submitClicked  = new EventEmitter<AAA_DESTINO>();

clickedRows  = new Set<AAA_DESTINO>();

constructor( @Inject(MAT_DIALOG_DATA) public data: AAA_DESTINO[],public dialogRef: MatDialogRef<DestinoModalComponent>,public destinoService:DestinosService,public dialog: MatDialog){}

displayedColumns: string[] = ['ubigeo', 'codigolocalanexo', 'direccion', 'numerdoc','options'];
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
  async eliminarDireccion(event:AAA_DESTINO){
    const result = await Swal.fire({
      title: 'Esta acción no se puede deshacer',
      text: '¿Estás seguro de eliminar la direccion: '+event.direcciondestino+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons:true,
      cancelButtonColor:'red',
      confirmButtonColor:'green'
    });
    if (!result.isConfirmed) {
      return;
    }
    this.destinoService.EliminarDestino(event).subscribe(
      (resp:any) => {
        Swal.fire('Destino eliminado satisfactoriamente', '', 'success');
        this.data=this.removerObjetoDeArray(this.data,event);
        this.dataSource=new MatTableDataSource(this.data);
      },
      error => {
        Swal.fire('No se pudo eliminar el destino', '', 'error');
      }
    );
  }
  editarDireccion(event:AAA_DESTINO){
    console.log(event);
    const dialogRef = this.dialog.open(EditDestinoComponentComponent, {
      data: event,width:'500px',
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
  CrearDireccion(){
    let datos:AAA_DESTINO={codigolocalanexo:'',direcciondestino:'',numerodocumentoadquiriente:'',tienda:'',usuarioid:0,ubigeodestino:'',datestamp:new Date()};
    const dialogRef = this.dialog.open(EditDestinoComponentComponent, {
      data: datos!,width:'500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result!=undefined){
        if(result.numerodocumentoadquiriente.length>0){
          this.data.push(result);
          this.dataSource=new MatTableDataSource(this.data);
        }
      }

    });
  }
}
