import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { chofer } from 'src/models/choferSec';
import { ChoferModalComponent } from '../chofer-modal.component';
import { ChoferService } from 'src/services/chofer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-chofer',
  templateUrl: './edit-chofer.component.html',
  styleUrls: ['./edit-chofer.component.css']
})

export class EditChoferComponent {
  [x: string]: any;
  boton:string = "guardar"
  DatosEditables : chofer|undefined;

  choForm = new FormGroup ({
    numerodocumentochofer: new FormControl("", [Validators.minLength(8),Validators.maxLength(11),Validators.required,Validators.pattern(/^\d+$/)]),
    tipodocumentochofer : new FormControl("", [Validators.required]),
    nombre : new FormControl("", [Validators.required]),
    apellido : new FormControl("", [Validators.required]),
    brevete : new FormControl("", [Validators.required]),
    placavehiculo : new FormControl("", [Validators.required]),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: chofer,
    public dialogRef: MatDialogRef<ChoferModalComponent>,
    public choferService:ChoferService,){
  }

  ngOnInit(): void {
    if(this.data.numerodocumentochofer==undefined || this.data.numerodocumentochofer.length==0){
      this.boton="Crear chofer"
    }else{
      this.choForm.get('numerodocumentochofer')?.patchValue(this.data.numerodocumentochofer!)
      this.choForm.get('tipodocumentochofer')?.patchValue(this.data.tipodocumentochofer!)
      this.choForm.get('nombre')?.patchValue(this.data.nombre!)
      this.choForm.get('apellido')?.patchValue(this.data.apellido!)
      this.choForm.get('brevete')?.patchValue(this.data.brevete!)
      this.choForm.get('placavehiculo')?.patchValue(this.data.placavehiculo!)
    }
    let parsedo = JSON.stringify(this.data);
    this.DatosEditables = JSON.parse(parsedo);
  }
  
  onNoClick(event :any){
    event.preventDefault();
    this.dialogRef.close();
  }

  action(){
    let chofer={
      numerodocumentochofer:this.choForm.get('numerodocumentochofer')!.value!,
      tipodocumentochofer: this.choForm.get('tipodocumentochofer')!.value!,
      nombre: this.choForm.get('nombre')!.value!,
      apellido: this.choForm.get('apellido')!.value!,
      brevete:this.choForm.get('brevete')!.value!,
      placavehiculo:this.choForm.get('placavehiculo')!.value!,
      id:0
    }
    if(this.data.numerodocumentochofer==undefined || this.data.numerodocumentochofer.length==0){
      this.crearChofer(chofer,"Se agrego satisfactoriamente el chofer")
      
    }else{
      this.choferService.eliminarChofer(this.data).subscribe(resp=>{
        this.crearChofer(chofer,"Se actualizo satisfactoriamente el chofer")
      })
    }
  }

  crearChofer(chofer:any, dato:string){
    this.choferService.crearChofer(chofer).subscribe(resp=>{
      if (this.data.numerodocumentochofer != undefined ) {
        Swal.fire("Felicidades",dato,"success");
        this.dialogRef.close(resp);
      }
      else {
        Swal.fire('No se pudo guardar', '', 'error');
      }
    })
  }
  
}
