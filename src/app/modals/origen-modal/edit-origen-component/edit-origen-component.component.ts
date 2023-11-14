import { Component, Inject } from '@angular/core';
import { Aaa_OrigenDTO } from 'src/models/origen';
import { OrigenModalComponent } from '../origen-modal.component';
import { OrigenService } from 'src/services/origen.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AAA_DESTINO } from 'src/models/destino';

@Component({
  selector: 'app-edit-origen-component',
  templateUrl: './edit-origen-component.component.html',
  styleUrls: ['./edit-origen-component.component.css']
})
export class EditOrigenComponentComponent {
  boton:string="Editar destino"
  DatosEditables:AAA_DESTINO|undefined;

  destinoForm = new FormGroup({
    direccion: new FormControl("", [Validators.required]),
    ubigeo: new FormControl("", [Validators.required]),
    local: new FormControl("", [Validators.maxLength(4),Validators.required,Validators.pattern(/^\d+$/)]),
    numeroadquiriente: new FormControl("", [Validators.minLength(8),Validators.maxLength(11),Validators.required,Validators.pattern(/^\d+$/)]),
    tienda: new FormControl(""),
  });


  constructor(@Inject(MAT_DIALOG_DATA) public data: Aaa_OrigenDTO,public dialogRef: MatDialogRef<OrigenModalComponent>,public destinoservice:OrigenService){}
  ngOnInit(): void {
    if(this.data.numerodocumentoemisor==undefined || this.data.numerodocumentoemisor.length==0){
      this.boton="Crear destino"
    }else{
      this.destinoForm.get('direccion')?.patchValue(this.data.direccionorigen!)
      this.destinoForm.get('ubigeo')?.patchValue(this.data.ubigeoorigen!)
      this.destinoForm.get('local')?.patchValue(this.data.codigolocalanexo!)
      this.destinoForm.get('numeroadquiriente')?.patchValue(this.data.numerodocumentoemisor!)
      this.destinoForm.get('tienda')?.patchValue(this.data.tienda!)
    }
    let parsedo = JSON.stringify(this.data);
    this.DatosEditables = JSON.parse(parsedo);
  }

  onNoClick(event :any){
    event.preventDefault();
    this.dialogRef.close();
  }
  acction(){
    let desti:Aaa_OrigenDTO={
      codigolocalanexo:this.destinoForm.get('local')!.value!,
      direccionorigen:this.destinoForm.get('direccion')!.value!,
      numerodocumentoemisor:this.destinoForm.get('numeroadquiriente')!.value!,
      ubigeoorigen:this.destinoForm.get('ubigeo')!.value!,
      datestamp:new Date(),
      usuarioid:0,
      tienda:this.destinoForm.get('tienda')!.value!,
    }

    if(this.data.numerodocumentoemisor==undefined || this.data.numerodocumentoemisor.length==0){
      this.AgregarDestino(desti,"Se agrego satisfactoriamente la direccion")
    }else{
      console.log("estaentrandoaaqui")
      this.destinoservice.EliminarOrigen(this.data).subscribe(resp=>{
        this.AgregarDestino(desti,"Se actualizo satisfactoriamente la direccion")
      })
    }
  }
AgregarDestino(desti:any,dato:string){
  this.destinoservice.AgregarUnOrigen(desti).subscribe((resp:any)=>{
        Swal.fire("Felicidades",dato,"success")  ;
        if(this.data.numerodocumentoemisor==undefined || this.data.numerodocumentoemisor==""){
          this.dialogRef.close(resp);
        }else{
        this.dialogRef.close({after:this.data,before:resp});
        }
  })
}
}


