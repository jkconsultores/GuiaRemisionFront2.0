import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-documentos-modal',
  templateUrl: './documentos-modal.component.html',
  styleUrls: ['./documentos-modal.component.css']
})

export class DocumentosModalComponent {

  docuForm = new FormGroup ({
    numerodocumento : new FormControl("", [Validators.required]),
  })

  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: documento,
    // public dialogRef: MatDialogRef<ChoferModalComponent>,
    // public choferService:ChoferService,
    ){
  }
}
