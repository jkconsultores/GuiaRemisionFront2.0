import { Component, Inject } from '@angular/core';
import { VehiculosModalComponent } from '../vehiculos-modal.component';
import { VehiculoDTO } from 'src/models/Vehiculos';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehiculoService } from 'src/services/vehiculo.service';
import Swal from 'sweetalert2';
import { VehiculoCreateDTO } from 'src/models/vehiculoCreateDTO';

@Component({
  selector: 'app-edit-vehiculo-component',
  templateUrl: './edit-vehiculo-component.component.html',
  styleUrls: ['./edit-vehiculo-component.component.css']
})
export class EditVehiculoComponentComponent {
  boton:string="Editar vehiculo"
  DatosEditables:VehiculoDTO|undefined;

  destinoForm = new FormGroup({
    color: new FormControl(""),
    inscripcionMtc: new FormControl(""),
    marca: new FormControl(""),
    modelo: new FormControl(""),
    mtc: new FormControl(""),
    placaVehiculo: new FormControl("",[Validators.minLength(6),Validators.maxLength(6),Validators.required]),
  });


  constructor(@Inject(MAT_DIALOG_DATA) public data: VehiculoDTO,public dialogRef: MatDialogRef<VehiculosModalComponent>,public vehiculoService:VehiculoService){}
  ngOnInit(): void {
    if(this.data.id==undefined || this.data.id==0){
      this.boton="Crear vehiculo"
    }else{
      this.destinoForm.get('color')?.patchValue(this.data.color!)
      this.destinoForm.get('inscripcionMtc')?.patchValue(this.data.inscripcionMtc!)
      this.destinoForm.get('marca')?.patchValue(this.data.marca!)
      this.destinoForm.get('modelo')?.patchValue(this.data.modelo!)
      this.destinoForm.get('mtc')?.patchValue(this.data.mtc!)
      this.destinoForm.get('placaVehiculo')?.patchValue(this.data.placaVehiculo!)
    }
    let parsedo = JSON.stringify(this.data);
    this.DatosEditables = JSON.parse(parsedo);
  }

  onNoClick(event :any){
    event.preventDefault();
    this.dialogRef.close();
  }
  acction(){
    let desti:VehiculoCreateDTO={
      color:this.destinoForm.get('color')!.value!,
      inscripcionMtc:this.destinoForm.get('inscripcionMtc')!.value!,
      marca:this.destinoForm.get('marca')!.value!,
      modelo:this.destinoForm.get('modelo')!.value!,
      placaVehiculo:this.destinoForm.get('placaVehiculo')!.value!,
      mtc:this.destinoForm.get('mtc')!.value!,usuarioId:0,fechaCreacion:new Date()
    }

    if(this.data.id==undefined || this.data.id==0){
      this.vehiculoService.addVehiculo(desti).subscribe((resp:any)=>{
      Swal.fire("Felicidades","Se agrego satisfactoriamente el vehiculo","success")  ;
      this.dialogRef.close(resp);
      });
    }else{
      let vehi:VehiculoDTO ={
        color:this.destinoForm.get('color')!.value!,
        inscripcionMtc:this.destinoForm.get('inscripcionMtc')!.value!,
        marca:this.destinoForm.get('marca')!.value!,
        modelo:this.destinoForm.get('modelo')!.value!,
        placaVehiculo:this.destinoForm.get('placaVehiculo')!.value!,
        mtc:this.destinoForm.get('mtc')!.value!,id:this.data.id
      }
      this.vehiculoService.updateVehiculo(vehi).subscribe(resp=>{
        Swal.fire("Felicidades","Se actualizo satisfactoriamente el vehiculo","success")  ;
        this.dialogRef.close({after:this.data,before:resp});
      })
    }
  }

}


