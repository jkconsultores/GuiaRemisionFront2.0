import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { chofer } from 'src/models/choferSec';
import { ChoferService } from 'src/services/chofer.service';
import { EditChoferComponent } from './edit-chofer/edit-chofer.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-chofer-modal',
  templateUrl: './chofer-modal.component.html',
  styleUrls: ['./chofer-modal.component.css']
})

export class ChoferModalComponent {
  @Input()
  @Output()
  submitClicked  = new EventEmitter<chofer>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: chofer[],
    public dialogRef: MatDialogRef<ChoferModalComponent>,
    public dialog: MatDialog,
    public choferService: ChoferService,
  ){console.log('data' , this.data)  
  }

  displayedColumns: string[] = ['numerodocumentochofer', 'tipodocumentochofer', 'nombre', 'apellido',  'brevete', 'placavehiculo', 'options'];
  dataSource = new MatTableDataSource(this.data);
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  onNoClick() {
    this.dialogRef.close();
  }

  ElementoElegido(dato:any){
    this.submitClicked.emit(dato)
    this.dialogRef.close();
  }

  crearChofer(){
    let datos:chofer={numerodocumentochofer:'',tipodocumentochofer:'',nombre:'', apellido:'', brevete:'', placavehiculo:'' };
    const dialogRef = this.dialog.open(EditChoferComponent, {
      data: datos!, width:'800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result!=undefined){
        if(result.numerodocumentochofer.length>0){
          this.data.push(result);
          this.dataSource=new MatTableDataSource(this.data);
        }
      }
    });
  }

  editarChofer(event:chofer){
    console.log(event);
    const dialogRef = this.dialog.open(EditChoferComponent, {
      data: event,width:'800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.choferService.getChofer().subscribe((resp:chofer[])=>{
        this.data=resp;
        this.dataSource=new MatTableDataSource(this.data);
      })
    });
  }

  async eliminarChofer(event:chofer){
    const result = await Swal.fire({
      title: 'Esta acción no se puede deshacer',
      text: '¿Estás seguro de eliminar al chofer: '+event.nombre+'?',
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
    this.choferService.eliminarChofer(event).subscribe(
      (resp:any) => {
        Swal.fire('Chofer eliminado satisfactoriamente', '', 'success');
        this.data=this.removerObjetoDeArray(this.data,event);
        this.dataSource=new MatTableDataSource(this.data);
      },
      error => {
        Swal.fire('No se pudo eliminar el empresa', '', 'error');
      }
    );
  }

  removerObjetoDeArray(arr: any[], objeto: any): any[] {
    const index = arr.findIndex(item => item === objeto);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

}
