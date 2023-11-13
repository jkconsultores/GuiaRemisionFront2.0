import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AAA_EMPRESA } from 'src/models/Empresa';
import { EmpresaModalComponent } from '../empresa-modal.component';
import { EmpresaService } from 'src/services/empresa.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-edit-empresa-component',
  templateUrl: './edit-empresa-component.component.html',
  styleUrls: ['./edit-empresa-component.component.css']
})

export class EditEmpresaComponentComponent {
  [x: string]: any;
  boton:string="guardar"
  DatosEditables:AAA_EMPRESA|undefined;
  
  empresaForm = new FormGroup({
    numerodocumentoemisor: new FormControl("", [Validators.minLength(8),Validators.maxLength(11),Validators.required,Validators.pattern(/^\d+$/)]),
    nombreempresa: new FormControl("", [Validators.required]),
    direccionemisor : new FormControl("", [Validators.required]),
    ubigeoemisor : new FormControl("", [Validators.required]),
    provinciaemisor: new FormControl("", [Validators.required]),
    departamentoemisor: new FormControl("", [Validators.required]),
    razoncomercialemisor: new FormControl("", [Validators.required]),
    tipodocumentoemisor: new FormControl("", [Validators.required]),
    distritoemisor: new FormControl("", [Validators.required]),
    razonsocialemisor: new FormControl("", [Validators.required]),
    paisemisor: new FormControl("", [Validators.required]),
  });
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: AAA_EMPRESA,public dialogRef: MatDialogRef<EmpresaModalComponent>,public empresaService:EmpresaService){}
  
  ngOnInit(): void {
    if(this.data.numerodocumentoemisor==undefined || this.data.numerodocumentoemisor.length==0){
      this.boton="Crear empresa"
    }else{
      this.empresaForm.get('numerodocumentoemisor')?.patchValue(this.data.numerodocumentoemisor!)
      this.empresaForm.get('direccionemisor')?.patchValue(this.data.direccionemisor!)
      this.empresaForm.get('ubigeoemisor')?.patchValue(this.data.ubigeoemisor!)
      this.empresaForm.get('provinciaemisor')?.patchValue(this.data.provinciaemisor!)
      this.empresaForm.get('departamentoemisor')?.patchValue(this.data.departamentoemisor!)
      this.empresaForm.get('razoncomercialemisor')?.patchValue(this.data.razoncomercialemisor!)
      this.empresaForm.get('nombreempresa')?.patchValue(this.data.nombreempresa!)
      this.empresaForm.get('distritoemisor')?.patchValue(this.data.distritoemisor!)
      this.empresaForm.get('tipodocumentoemisor')?.patchValue(this.data.tipodocumentoemisor!)
      this.empresaForm.get('razonsocialemisor')?.patchValue(this.data.razonsocialemisor!)
      this.empresaForm.get('paisemisor')?.patchValue(this.data.paisemisor!)
    }
    let parsedo = JSON.stringify(this.data);
    this.DatosEditables = JSON.parse(parsedo);
  }
  
  onNoClick(event :any){
    event.preventDefault();
    this.dialogRef.close();
  }

  acction(){
    console.log("Esta en action")
    console.log(this.DatosEditables)
    console.log(this.data)
    console.log(this.empresaForm.value)
    console.log("Esta fuera de action")

    let desti={
      numerodocumentoemisor:this.empresaForm.get('numerodocumentoemisor')!.value!,
      direccionemisor:this.empresaForm.get('direccionemisor')!.value!,
      ubigeoemisor:this.empresaForm.get('ubigeoemisor')!.value!,
      provinciaemisor:this.empresaForm.get('provinciaemisor')!.value!,
      departamentoemisor: this.empresaForm.get('departamentoemisor')!.value!,
      razoncomercialemisor: this.empresaForm.get('razoncomercialemisor')!.value!,
      nombreempresa: this.empresaForm.get('nombreempresa')!.value!,
      tipodocumentoemisor: this.empresaForm.get('tipodocumentoemisor')!.value!,
      distritoemisor: this.empresaForm.get('distritoemisor')!.value!,
      razonsocialemisor: this.empresaForm.get('razonsocialemisor')!.value!, 
      paisemisor:this.empresaForm.get('paisemisor')!.value!, 
      id:0
    }
    
    if(this.data.numerodocumentoemisor==undefined || this.data.numerodocumentoemisor.length==0){
      this.crearEmpresa(desti,"Se agrego satisfactoriamente la empresa")
      
    }else{
      this.empresaService.eliminarEmpresa(this.data).subscribe(resp=>{
        this.crearEmpresa(desti,"Se actualizo satisfactoriamente la empresa")
      })
    }
    
  }
  
  crearEmpresa(desti:any,dato:string){
    this.empresaService.crearEmpresa(desti).subscribe(resp=>{
      if (this.data.numerodocumentoemisor != undefined ) {
        Swal.fire("Felicidades",dato,"success");
        console.log(resp)  
        this.dialogRef.close(resp);  
      }
      else {
        Swal.fire('No se pudo guardar', '', 'error');
      }
              
    })
  }
  
}
