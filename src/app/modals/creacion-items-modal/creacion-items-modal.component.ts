import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsModalComponent } from '../items-modal/items-modal.component';
import { SPE_DESPATCH_ITEM } from 'src/models/SPE_DESPATCH_ITEM';
import Swal from 'sweetalert2';
import { T_UnidadMedida } from 'src/models/UnidadMedida';
import { MotivosService } from 'src/services/motivos.service';
import { Observable, map, startWith } from 'rxjs';
import { ProductoService } from 'src/services/producto.service';
import { producto } from 'src/models/producto';

@Component({
  selector: 'app-creacion-items-modal',
  templateUrl: './creacion-items-modal.component.html',
  styleUrls: ['./creacion-items-modal.component.css']
})
export class CreacionItemsModalComponent implements OnInit {

  public unidadesDeMedida: T_UnidadMedida[] = [];
  // stateCtrl = new FormControl('');
  public filteredOptions: Observable<T_UnidadMedida[]> | undefined;
  Crearproducto:string="Crear producto";
  destinoForm = new FormGroup({
    codigo: new FormControl("", [Validators.required]),
    descripcion: new FormControl("", [Validators.required]),
    unidad: new FormControl(""),
  });

  constructor(
    public dialogRef: MatDialogRef<ItemsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: producto, private motivosService: MotivosService, private productosService: ProductoService
  ) { }
  _filterStates(state: any) {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    if(this.data.id!=undefined && this.data.id!=null){
      this.destinoForm.get('codigo')?.patchValue(this.data.codigo)
      this.destinoForm.get('descripcion')?.patchValue(this.data.descripcion)
      this.destinoForm.get('unidad')?.patchValue(this.data.unidadmedida)
      this.Crearproducto="Editar producto"
    }
    this.motivosService.GetUnidadesDeMedida().subscribe((resp: any) => {
      this.unidadesDeMedida = resp;
    })
    this.filteredOptions = this.destinoForm!.get('unidad')!.valueChanges.pipe(
      startWith(''),
      map(unidades => (unidades ? this._filter(unidades) : this.unidadesDeMedida.slice())),
    );
  }
  CambiarValor(dataOption: any) {
    this.data.unidadmedida = dataOption.option.value;
  }
  onNoClick(event: any) {
    event.preventDefault();
    this.dialogRef.close();
  }
  EnvioDatos() {
    if(this.data.id!=undefined && this.data.id!=null){
      let producto: producto = {
        id:this.data.id,
        cantidad: '1',
        codigo: this.destinoForm!.get('codigo')!.value!,
        descripcion: this.destinoForm!.get('descripcion')!.value!,
        unidadmedida: this.destinoForm!.get('unidad')!.value!,
      }
      this.productosService.ActualziarUnProducto(producto).subscribe(resp=>{
        Swal.fire("Felicidades", "Producto actualizado correctamente", "success");
        this.dialogRef.close({end:resp,last:this.data})
      })
    }else{
      let producto: producto = {
        cantidad: '1',
        codigo: this.destinoForm!.get('codigo')!.value!,
        descripcion: this.destinoForm!.get('descripcion')!.value!,
        unidadmedida: this.destinoForm!.get('unidad')!.value!,
      }
      this.AgregarProducto(producto,"Producto agregado correctamente");
    }
  }

  AgregarProducto(data: producto, texto: string) {
    this.productosService.AgregarUnProducto(data).subscribe(resp => {
      Swal.fire("Felicidades", texto, "success");
      this.dialogRef.close(resp)
    }, error => {

    });
  }

  private _filter(value: string): T_UnidadMedida[] {
    const filterValue = value.toLowerCase();

    return this.unidadesDeMedida.filter(option => option.descripcion.toLowerCase().includes(filterValue) || option.valor.toLowerCase().includes(filterValue));
  }

}
