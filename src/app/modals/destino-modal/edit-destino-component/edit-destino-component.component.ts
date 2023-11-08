import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AAA_DESTINO } from 'src/models/destino';
import { DestinoModalComponent } from '../destino-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DestinosService } from 'src/services/destinos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-destino-component',
  templateUrl: './edit-destino-component.component.html',
  styleUrls: ['./edit-destino-component.component.css']
})
export class EditDestinoComponentComponent implements OnInit {

  boton:string="Editar destino"
  DatosEditables:AAA_DESTINO|undefined;

  destinoForm = new FormGroup({
    direccion: new FormControl("", [Validators.required]),
    ubigeo: new FormControl("", [Validators.required]),
    local: new FormControl("", [Validators.maxLength(4),Validators.required,Validators.pattern(/^\d+$/)]),
    numeroadquiriente: new FormControl("", [Validators.minLength(8),Validators.maxLength(11),Validators.required,Validators.pattern(/^\d+$/)]),
    tienda: new FormControl(""),
  });


  constructor(@Inject(MAT_DIALOG_DATA) public data: AAA_DESTINO,public dialogRef: MatDialogRef<DestinoModalComponent>,public destinoservice:DestinosService){}
  ngOnInit(): void {
    if(this.data.numerodocumentoadquiriente==undefined){
      this.boton="Crear destino"
    }else{
      this.destinoForm.get('direccion')?.patchValue(this.data.direcciondestino!)
      this.destinoForm.get('ubigeo')?.patchValue(this.data.ubigeodestino!)
      this.destinoForm.get('local')?.patchValue(this.data.codigolocalanexo!)
      this.destinoForm.get('numeroadquiriente')?.patchValue(this.data.numerodocumentoadquiriente!)
      this.destinoForm.get('tienda')?.patchValue(this.data.tienda!)
    }
    let parsedo = JSON.stringify(this.data);
    this.DatosEditables = JSON.parse(parsedo);
  }

  onNoClick(){
    this.dialogRef.close();
  }
  acction(){
    console.log("Esta en action")
    console.log(this.DatosEditables)
    console.log(this.data)
    console.log(this.destinoForm.value)
    console.log("Esta fuera de action")
    // tienda:this.destinoForm.get('tienda')!.value!,
    let desti={
      codigolocalanexo:this.destinoForm.get('local')!.value!,
      direcciondestino:this.destinoForm.get('direccion')!.value!,
      numerodocumentoadquiriente:this.destinoForm.get('numeroadquiriente')!.value!,
      ubigeodestino:this.destinoForm.get('ubigeo')!.value!,
      datestamp:new Date(),
      usuarioid:0
    }

    if(this.data.numerodocumentoadquiriente==undefined){
      this.AgregarDestino(desti,"Se agrego satisfactoriamente la direccion")
    }else{
      this.destinoservice.EliminarDestino(this.data).subscribe(resp=>{
        this.AgregarDestino(desti,"Se actualizo satisfactoriamente la direccion")
      })
    }
  }
AgregarDestino(desti:any,dato:string){
  this.destinoservice.AgregarUnDestino(desti).subscribe(resp=>{
        Swal.fire("Felicidades",dato,"success")  ;
        this.dialogRef.close();
  })
}
}


