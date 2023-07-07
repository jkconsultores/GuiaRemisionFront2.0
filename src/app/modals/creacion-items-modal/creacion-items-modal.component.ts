import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsModalComponent } from '../items-modal/items-modal.component';
import { SPE_DESPATCH_ITEM } from 'src/models/SPE_DESPATCH_ITEM';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creacion-items-modal',
  templateUrl: './creacion-items-modal.component.html',
  styleUrls: ['./creacion-items-modal.component.css']
})
export class CreacionItemsModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ItemsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SPE_DESPATCH_ITEM,
  ) {}

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
}
