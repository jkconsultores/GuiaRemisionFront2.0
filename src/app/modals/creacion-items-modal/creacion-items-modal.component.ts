import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsModalComponent } from '../items-modal/items-modal.component';
import { SPE_DESPATCH_ITEM } from 'src/models/SPE_DESPATCH_ITEM';
import Swal from 'sweetalert2';
import { T_UnidadMedida } from 'src/models/UnidadMedida';
import { MotivosService } from 'src/services/motivos.service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-creacion-items-modal',
  templateUrl: './creacion-items-modal.component.html',
  styleUrls: ['./creacion-items-modal.component.css']
})
export class CreacionItemsModalComponent implements OnInit {

  public unidadesDeMedida:T_UnidadMedida[] = [];
  stateCtrl = new FormControl('');
  public filteredOptions: Observable<T_UnidadMedida[]> | undefined;
  constructor(
    public dialogRef: MatDialogRef<ItemsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SPE_DESPATCH_ITEM, private motivosService:MotivosService
  ) {}
  _filterStates(state: any) {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.motivosService.GetUnidadesDeMedida().subscribe((resp:any)=>{
      this.unidadesDeMedida=resp;
    })
    this.filteredOptions = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(unidades => (unidades ? this._filter(unidades) : this.unidadesDeMedida.slice())),
    );
  }
  CambiarValor(dataOption: any){
    this.data.unidadMedida=dataOption.option.value;
  }
  onNoClick(){
    this.dialogRef.close();
  }
  EnvioDatos(){
    console.log(this.data);
    if(this.data.codigo==''){
      return true
    }else if(this.data.descripcion == ''){
      return true
    }else if(this.data.unidadMedida == ''){
      return true
    }else{
      return false
    }
  }

  private _filter(value: string): T_UnidadMedida[] {
    const filterValue = value.toLowerCase();

    return this.unidadesDeMedida.filter(option => option.descripcion.toLowerCase().includes(filterValue) || option.valor.toLowerCase().includes(filterValue));
  }

}
