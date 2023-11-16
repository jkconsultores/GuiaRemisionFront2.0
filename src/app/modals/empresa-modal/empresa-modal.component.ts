import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AAA_EMPRESA } from 'src/models/Empresa';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditEmpresaComponentComponent } from './edit-empresa-component/edit-empresa-component.component';
import { EmpresaService } from 'src/services/empresa.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-empresa-modal',
  templateUrl: './empresa-modal.component.html',
  styleUrls: ['./empresa-modal.component.css']
})

export class EmpresaModalComponent {
  @Input()
  titulo!:string;
  @Output()
  submitClicked  = new EventEmitter<AAA_EMPRESA>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AAA_EMPRESA[],
    public dialogRef: MatDialogRef<EmpresaModalComponent>,
    public dialog: MatDialog,
    public empresaService:EmpresaService
    ){
    }

    displayedColumns: string[] = ['nombreempresa', 'numerodocumentoemisor', 'tipodocumentoemisor', 'paisemisor', 'provinciaemisor', 'options'];
    dataSource = new MatTableDataSource(this.data);

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onNoClick(){
      this.dialogRef.close();
    }

  ElemntoElegido(dato:any){
    this.submitClicked.emit(dato)
    this.dialogRef.close();
  }

  crearEmpresa(){
    let datos:AAA_EMPRESA={numerodocumentoemisor:'',nombreempresa:'',tipodocumentoemisor:'',razonsocialemisor:'',ubigeoemisor:''};
    const dialogRef = this.dialog.open(EditEmpresaComponentComponent, {
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

  editarEmpresa(event:AAA_EMPRESA){
    console.log(event);
    const dialogRef = this.dialog.open(EditEmpresaComponentComponent, {
      data: event,width:'800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.empresaService.getEmpresas().subscribe((resp:AAA_EMPRESA[])=>{
        this.data=resp;
        this.dataSource=new MatTableDataSource(this.data);
      })
    });
  }

  async eliminarEmpresa(event:AAA_EMPRESA){
    const result = await Swal.fire({
      title: 'Esta acción no se puede deshacer',
      text: '¿Estás seguro de eliminar la empresa: '+event.nombreempresa+'?',
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
    this.empresaService.eliminarEmpresa(event).subscribe(
      (resp:any) => {
        Swal.fire('Empresa eliminada satisfactoriamente', '', 'success');
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
