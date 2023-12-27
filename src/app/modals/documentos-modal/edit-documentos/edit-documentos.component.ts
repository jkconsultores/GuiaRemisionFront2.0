import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentosModalComponent } from '../documentos-modal.component';
import { docReferenciado } from 'src/models/docRef';

@Component({
  selector: 'app-edit-documentos',
  templateUrl: './edit-documentos.component.html',
  styleUrls: ['./edit-documentos.component.css']
})

export class EditDocumentosComponent {
  [x: string]: any;
  DatosEditables:docReferenciado|undefined;
  boton:string="guardar"
  empresaForm = new FormGroup({
    numeroDocumentoDocRel: new FormControl("", [Validators.minLength(8),Validators.maxLength(11),Validators.required,Validators.pattern(/^\d+$/)]),
    tipoDocumentoDocRel: new FormControl("", [Validators.required]),
    numeroDocumentoEmisorDocRel: new FormControl("", [Validators.required]),    
    tipoDocumentoEmisorDocRel: new FormControl("", [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Document,
    public dialogRef: MatDialogRef<DocumentosModalComponent>,
    ){ }

  onNoClick(event :any){
    event.preventDefault();
    this.dialogRef.close();
  }
  
  action(){
    
  } 

}
