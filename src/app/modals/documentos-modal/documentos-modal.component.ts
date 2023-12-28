import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { docReferenciado } from 'src/models/docRef';
import { DocumentoService } from 'src/services/documento.service';
import { EditDocumentosComponent } from './edit-documentos/edit-documentos.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-documentos-modal',
  templateUrl: './documentos-modal.component.html',
  styleUrls: ['./documentos-modal.component.css'],
  standalone: true,
  imports: [ HttpClientModule, ReactiveFormsModule, FormsModule, CommonModule, MatFormFieldModule, MatButtonModule,
    MatDialogModule, MatInputModule, MatIconModule, MatTableModule,
  ],})

export class DocumentosModalComponent {
  @Input()
  @Output()
  submitClicked  = new EventEmitter<docReferenciado>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: docReferenciado[],
    public dialogRef: MatDialogRef<DocumentosModalComponent>,
    public dialog: MatDialog,
    public documentoService:DocumentoService
    ){
      console.log('data', data);
    }

  displayedColumns: string[] = ['tipoDocumentoDocRel', 'numeroDocumentoDocRel', 'numeroDocumentoEmisorDocRel', 'tipoDocumentoEmisorDocRel','options'];
  dataSource = new MatTableDataSource(this.data);

  ngOnInit(): void {
    console.log('data', this.data);
    console.log('datalength', this.data.length);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  crearDoc(){
    let datos:docReferenciado={tipoDocumentoDocRel:'',numeroDocumentoDocRel:'',numeroDocumentoEmisorDocRel:'',tipoDocumentoEmisorDocRel:'',};
    const dialogRef = this.dialog.open(EditDocumentosComponent, {
      data:datos, width:'600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result !== undefined) {
        const datosExistentes = this.data.find(item =>
          item.tipoDocumentoDocRel === result.tipoDocumentoDocRel &&
          item.numeroDocumentoDocRel === result.numeroDocumentoDocRel &&
          item.numeroDocumentoEmisorDocRel === result.numeroDocumentoEmisorDocRel &&
          item.tipoDocumentoEmisorDocRel === result.tipoDocumentoEmisorDocRel
        );  
        if (datosExistentes) {
          Swal.fire({
            icon: 'warning',
            title: '¡Ya existe el documento!',
            text: 'El documento con el código ' + result.codigoDocumentoDocRel + ' ya existe',
          });
          console.error('Error: Los datos ya existen');
        } else {
          this.data.push(result);
          this.dataSource = new MatTableDataSource(this.data);
        }
      }      
    });
  }
  
  onNoClick(){
    this.dialogRef.close();
  }

  editarDoc(elemento: docReferenciado) {
    const dialogRef = this.dialog.open(EditDocumentosComponent, {
      data: elemento, width:'600px',
    });  
    dialogRef.afterClosed().subscribe(result => {    
      if (result !== undefined) {
        const index = this.data.findIndex(item =>
          item.tipoDocumentoDocRel === elemento.tipoDocumentoDocRel &&
          item.numeroDocumentoDocRel === elemento.numeroDocumentoDocRel &&
          item.numeroDocumentoEmisorDocRel === elemento.numeroDocumentoEmisorDocRel &&
          item.tipoDocumentoEmisorDocRel === elemento.tipoDocumentoEmisorDocRel
        );  
        if (index !== -1) {
          this.data[index] = result;
          this.dataSource = new MatTableDataSource(this.data);
        }
      }
    });
  }
  
  
  eliminarDoc(elemento: docReferenciado) {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este documento?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.data = this.data.filter(item =>
          !(item.tipoDocumentoDocRel === elemento.tipoDocumentoDocRel &&
            item.numeroDocumentoDocRel === elemento.numeroDocumentoDocRel &&
            item.numeroDocumentoEmisorDocRel === elemento.numeroDocumentoEmisorDocRel &&
            item.tipoDocumentoEmisorDocRel === elemento.tipoDocumentoEmisorDocRel)
        );  
        this.dataSource = new MatTableDataSource(this.data);
      }
    });
  }
  
}
