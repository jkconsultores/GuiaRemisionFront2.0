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
    ){}

  displayedColumns: string[] = ['tipoDocumentoDocRel', 'numeroDocumentoDocRel', 'numeroDocumentoEmisorDocRel', 'tipoDocumentoEmisorDocRel','options'];
  dataSource = new MatTableDataSource(this.data);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  crearDoc(){
    let datos:docReferenciado={tipoDocumentoDocRel:'',numeroDocumentoDocRel:'',numeroDocumentoEmisorDocRel:'',tipoDocumentoEmisorDocRel:'',};
    const dialogRef = this.dialog.open(EditDocumentosComponent, {
      data: datos!, width:'600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result!=undefined){
        if(result.numeroDocumentoDocRel.length>0){
          this.data.push(result);
          this.dataSource=new MatTableDataSource(this.data);
        }
      }
    });
  }

  
  onNoClick(){
    this.dialogRef.close();
  }

  editarDoc(){

  }

  eliminarDoc(){

  }
}
