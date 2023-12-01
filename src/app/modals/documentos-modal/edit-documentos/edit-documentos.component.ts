import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentosModalComponent } from '../documentos-modal.component';

@Component({
  selector: 'app-edit-documentos',
  templateUrl: './edit-documentos.component.html',
  styleUrls: ['./edit-documentos.component.css']
})

export class EditChoferComponent {

  docuForm = new FormGroup ({
    numerodocumento : new FormControl("", [Validators.required]),
    tipodocumento : new FormControl("", [Validators.required]),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Document,
    public dialogRef: MatDialogRef<DocumentosModalComponent>,
    ){
    }


  action(){
    
  }  
}
