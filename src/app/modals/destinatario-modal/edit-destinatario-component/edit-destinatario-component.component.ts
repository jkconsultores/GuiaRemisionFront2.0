import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { destinatario } from 'src/models/destinatario';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DestinatarioModalComponent } from '../destinatario-modal.component';
import { DestinatariosService } from 'src/services/destinatarios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-destinatario-component',
  templateUrl: './edit-destinatario-component.component.html',
  styleUrls: ['./edit-destinatario-component.component.css']
})

export class EditDestinatarioComponentComponent {
  [x: string]: any;
  boton:string = "guardar"
  DatosEditables : destinatario|undefined;
  Pais:any[] = [];
  Departamento:any[] = [];
  Provincia:any[] = [];
  Distrito:any[] = []; 
  Ubigeo:string = '';

  destiForm = new FormGroup ({
    numerodocumentoadquiriente : new FormControl("", [Validators.required]),
    razonsocialadquiriente : new FormControl("", [Validators.required]),
    tipodocumentoadquiriente : new FormControl("", [Validators.required]),
    correo : new FormControl("", [Validators.required]),
    direccionadquiriente : new FormControl("", [Validators.required]),
    paisadquiriente : new FormControl("111", [Validators.required]),
    departamentoadquiriente : new FormControl("", [Validators.required]),
    provinciaadquiriente : new FormControl("", [Validators.required]),
    distritoadquiriente : new FormControl("", [Validators.required]),
    ubigeoadquiriente : new FormControl("", [Validators.required]),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: destinatario,
    public dialogRef: MatDialogRef<DestinatarioModalComponent>,
    public destinatarioService:DestinatariosService,){
  }

  ngOnInit(): void {  
    this.destiForm.get('paisadquiriente')!.disable();
    this.destinatarioService.getPais().subscribe((res:any[])=>{
      this.Pais= res;
    })
    this.destinatarioService.getDepartamento().subscribe((res:any[])=>{
      this.Departamento= res;
      if(this.data.numerodocumentoadquiriente){
        this.destiForm.get('departamentoadquiriente')?.patchValue(this.Departamento.find(t => t.name == this.data.departamentoadquiriente!).id)
        this.selectProvincias({value:this.destiForm.get('departamentoadquiriente')!.value!});
      }
    })

    if(this.data.numerodocumentoadquiriente==undefined || this.data.numerodocumentoadquiriente.length==0){
      this.boton="Crear destinatario"
    }else{
      this.destiForm.get('numerodocumentoadquiriente')?.patchValue(this.data.numerodocumentoadquiriente!)
      this.destiForm.get('tipodocumentoadquiriente')?.patchValue(this.data.tipodocumentoadquiriente!)
      this.destiForm.get('razonsocialadquiriente')?.patchValue(this.data.razonsocialadquiriente!)
      this.destiForm.get('correo')?.patchValue(this.data.correo!)
      this.destiForm.get('paisadquiriente')?.patchValue('111');
      this.destiForm.get('direccionadquiriente')?.patchValue(this.data.direccionadquiriente!)
    }
    let parsedo = JSON.stringify(this.data);
    this.DatosEditables = JSON.parse(parsedo);
  }

  selectProvincias(event:any){
    let dep = event.value
    this.destinatarioService.getProvincia(dep).subscribe((res:any[])=>{
      this.Provincia= res;
      if(this.data.numerodocumentoadquiriente){
        this.destiForm.get('provinciaadquiriente')?.patchValue(this.Provincia.find(t => t.nombre == this.data.provinciaadquiriente!).id)
        this.selectDistrito({value:this.destiForm.get('provinciaadquiriente')!.value!});
      }
    })
  }

  selectDistrito(event:any){
    let prov = event.value;
    let dep = this.destiForm.get('departamentoadquiriente')!.value!;
    this.destinatarioService.getDistrito(prov, dep).subscribe((res:any[])=>{
      this.Distrito= res;
      if(this.data.numerodocumentoadquiriente){
        this.destiForm.get('distritoadquiriente')?.patchValue(this.Distrito.find(t => t.nombre == this.data.distritoadquiriente!).id)
        this.destiForm.get('ubigeoadquiriente')?.patchValue(this.data.ubigeoadquiriente!);
      }
    })
  }

  selectUbigeo(event:any){
    let prov = this.destiForm.get('provinciaadquiriente')!.value!;
    let dep = this.destiForm.get('departamentoadquiriente')!.value!;
    let dist = this.destiForm.get('distritoadquiriente')!.value!;
    this.destinatarioService.getUbigeo(prov, dep, dist).subscribe((res:string)=>{
      this.Ubigeo= res;
      console.log (res)
      this.destiForm.get('ubigeoadquiriente')?.patchValue(this.Ubigeo)  
    })
  }

  onNoClick(event :any){
    event.preventDefault();
    this.dialogRef.close();
  }

  action(){
    console.log("Esta en action")
    console.log(this.DatosEditables)
    console.log(this.data)
    console.log(this.destiForm.value)
    console.log("Esta fuera de action")

    let desti={
      numerodocumentoadquiriente:this.destiForm.get('numerodocumentoadquiriente')!.value!,
      tipodocumentoadquiriente: this.destiForm.get('tipodocumentoadquiriente')!.value!,
      razonsocialadquiriente: this.destiForm.get('razonsocialadquiriente')!.value!,
      correo: this.destiForm.get('correo')!.value!,
      direccionadquiriente:this.destiForm.get('direccionadquiriente')!.value!,
      paisadquiriente:this.Pais.find(t =>t.id ==  this.destiForm.get('paisadquiriente')!.value!).pais, 
      departamentoadquiriente: this.Departamento.find(t => t.id == this.destiForm.get('departamentoadquiriente')!.value!).name,
      provinciaadquiriente: this.Provincia.find(t => t.id == this.destiForm.get('provinciaadquiriente')!.value!).nombre,
      distritoadquiriente: this.Distrito.find(t => t.id == this.destiForm.get('distritoadquiriente')!.value!).nombre,
      ubigeoadquiriente:this.destiForm.get('ubigeoadquiriente')!.value!,
      id:0
    }
    if(this.data.numerodocumentoadquiriente==undefined || this.data.numerodocumentoadquiriente.length==0){
      this.crearDestinatario(desti,"Se agrego satisfactoriamente el destinatario")
      
    }else{
      this.destinatarioService.eliminarDestinatario(this.data).subscribe(resp=>{
        this.crearDestinatario(desti,"Se actualizo satisfactoriamente el destinatario")
      })
    }
  }

  crearDestinatario(desti:any,dato:string){
    this.destinatarioService.crearDestinatario(desti).subscribe(resp=>{
      if (this.data.numerodocumentoadquiriente != undefined ) {
        Swal.fire("Felicidades",dato,"success");
        this.dialogRef.close(resp);
      }
      else {
        Swal.fire('No se pudo guardar', '', 'error');
      }
    })
  }

}
