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
  empresaForm = new FormGroup({
    numeroDocumentoDocRel: new FormControl("", [Validators.minLength(4),Validators.maxLength(11),Validators.required,Validators.pattern(/^\d+$/)]),
    tipoDocumentoDocRel: new FormControl("", [Validators.required]),
    numeroDocumentoEmisorDocRel: new FormControl("", [Validators.required]),    
    tipoDocumentoEmisorDocRel: new FormControl("", [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DocumentosModalComponent>,
    ){
      console.log('dato2', data);
    }

  ngOnInit(): void {
    console.log('dato3', this.data);
    if(this.data.numeroDocumentoDocRel==undefined || this.data.numeroDocumentoDocRel.length==0){
      this.boton="Crear empresa"
    }else{
      this.empresaForm.get('numeroDocumentoDocRel')?.patchValue(this.data.numeroDocumentoDocRel!)
      this.empresaForm.get('tipoDocumentoDocRel')?.patchValue(this.data.tipoDocumentoDocRel!)
      this.empresaForm.get('numeroDocumentoEmisorDocRel')?.patchValue(this.data.numeroDocumentoEmisorDocRel!)
      this.empresaForm.get('tipoDocumentoEmisorDocRel')?.patchValue(this.data.tipoDocumentoEmisorDocRel!)
    }
  }

  onNoClick(event :any){
    event.preventDefault();
    this.dialogRef.close();
  }
  
  action(){   
    let desti={
      tipoDocumentoDocRel:this.empresaForm.get('tipoDocumentoDocRel')!.value!,
      numeroDocumentoDocRel: this.empresaForm.get('numeroDocumentoDocRel')!.value!,
      numeroDocumentoEmisorDocRel: this.empresaForm.get('numeroDocumentoEmisorDocRel')!.value!,
      tipoDocumentoEmisorDocRel: this.empresaForm.get('tipoDocumentoEmisorDocRel')!.value!,
    }    
    this.dialogRef.close(desti);  
  } 

}
