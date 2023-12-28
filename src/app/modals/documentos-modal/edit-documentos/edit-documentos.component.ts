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
  boton:string="Guardar"
  documentoForm = new FormGroup({
    numeroDocumentoDocRel: new FormControl("", [Validators.minLength(8),Validators.maxLength(11),Validators.required,Validators.pattern(/^\d+$/)]),
    tipoDocumentoDocRel: new FormControl("", [Validators.required]),
    numeroDocumentoEmisorDocRel: new FormControl("", [Validators.required]),    
    tipoDocumentoEmisorDocRel: new FormControl("", [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DocumentosModalComponent>,
    ){}

  ngOnInit(): void {
    console.log('dato3', this.data);
    if(this.data.numeroDocumentoDocRel==undefined || this.data.numeroDocumentoDocRel.length==0){
      this.boton="Crear documento"
    }else{
      this.documentoForm.get('numeroDocumentoDocRel')?.patchValue(this.data.numeroDocumentoDocRel!)
      this.documentoForm.get('tipoDocumentoDocRel')?.patchValue(this.data.tipoDocumentoDocRel!)
      this.documentoForm.get('numeroDocumentoEmisorDocRel')?.patchValue(this.data.numeroDocumentoEmisorDocRel!)
      this.documentoForm.get('tipoDocumentoEmisorDocRel')?.patchValue(this.data.tipoDocumentoEmisorDocRel!)
    }
  }

  onNoClick(event :any){
    event.preventDefault();
    this.dialogRef.close();
  }
  
  action(){   
    let desti={
      tipoDocumentoDocRel:this.documentoForm.get('tipoDocumentoDocRel')!.value!,
      numeroDocumentoDocRel: this.documentoForm.get('numeroDocumentoDocRel')!.value!,
      numeroDocumentoEmisorDocRel: this.documentoForm.get('numeroDocumentoEmisorDocRel')!.value!,
      tipoDocumentoEmisorDocRel: this.documentoForm.get('tipoDocumentoEmisorDocRel')!.value!,
    }    
    this.dialogRef.close(desti);  
  } 

}
