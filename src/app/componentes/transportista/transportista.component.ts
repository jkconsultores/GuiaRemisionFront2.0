import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { transportista } from 'src/models/transportista';

@Component({
  selector: 'app-transportista',
  templateUrl: './transportista.component.html',
  styleUrls: ['./transportista.component.css']
})
export class TransportistaComponent {
  @Output()
  submitClicked = new EventEmitter<transportista>();
  filteredOptions!: Observable<transportista[]>;
  myControl = new FormControl();


  constructor(public dialog: MatDialog){}


  onSelectionChange(event: any){
    this.submitClicked.emit(event.option.value)
  }


  AbrirModalDeEmpresa(){

  }

  displayFn(country: transportista): string {
    return country && country.nombreTransportista ? country.nombreTransportista : '';
  }

  
}
