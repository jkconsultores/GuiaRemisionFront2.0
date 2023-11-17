import { Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { destinatario } from 'src/models/destinatario';
import { DestinatariosService } from 'src/services/destinatarios.service';
import { EditDestinatarioComponentComponent } from './edit-destinatario-component/edit-destinatario-component.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-destinatario-modal',
  templateUrl: './destinatario-modal.component.html',
  styleUrls: ['./destinatario-modal.component.css']
})

export class DestinatarioModalComponent {
  @Input()
  @Output()
  submitClicked = new EventEmitter<destinatario>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator
  cantidad: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: destinatario[],
    public dialogRef: MatDialogRef<DestinatarioModalComponent>,
    public dialog: MatDialog,
    public destinatarioService: DestinatariosService,
  ){  console.log('data' , this.data)  
  }

  displayedColumns: string[] = ['numerodocumentoadquiriente', 'tipodocumentoadquiriente', 'razonsocialadquiriente', 'direccionadquiriente', 'options'];
  
  dataSource = new MatTableDataSource(this.data);


  ngAfterViewInit() {
    // this.paginator._intl.itemsPerPageLabel = "Items por pagina";
    // this.paginator._intl.previousPageLabel = "Pagina anterior";
    // this.paginator._intl.nextPageLabel = "Pagina siguiente";
    // this.dataSource.paginator = this.paginator;
    // this.cantidad=this.data.length;
  }

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

  crearDestinatario(){
    let datos:destinatario={numerodocumentoadquiriente:'',tipodocumentoadquiriente:'',razonsocialadquiriente:'',direccionadquiriente:''};
    const dialogRef = this.dialog.open(EditDestinatarioComponentComponent, {
      data: datos!, width:'800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result!=undefined){
        if(result.numerodocumentoemisor.length>0){
          this.data.push(result);
          this.dataSource=new MatTableDataSource(this.data);
        }
      }
    });
  }

  editarDestinatario(event:destinatario){
    console.log(event);
    const dialogRef = this.dialog.open(EditDestinatarioComponentComponent, {
      data: event,width:'800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.destinatarioService.getDestinatario().subscribe((resp: destinatario[])=>{
        this.data=resp;
        this.dataSource=new MatTableDataSource(this.data);
      })
    });
  }

  async eliminarDestinatario(event:destinatario){
    const result = await Swal.fire({
      title: 'Esta acción no se puede deshacer',
      text: '¿Estás seguro de eliminar a : '+event.razonsocialadquiriente+'?',
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
    this.destinatarioService.eliminarDestinatario(event).subscribe(
      (resp:any) => {
        Swal.fire(' Eliminado satisfactoriamente', '', 'success');
        this.data=this.removerObjetoDeArray(this.data,event);
        this.dataSource=new MatTableDataSource(this.data);
      },
      error => {
        Swal.fire('No se pudo eliminar el destinatario', '', 'error');
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
