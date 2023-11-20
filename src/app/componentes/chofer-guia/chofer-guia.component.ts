import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { ChoferModalComponent } from 'src/app/modals/chofer-modal/chofer-modal.component';
import { chofer } from 'src/models/choferSec';
import { ChoferService } from 'src/services/chofer.service';


@Component({
  selector: 'app-chofer-guia',
  templateUrl: './chofer-guia.component.html',
  styleUrls: ['./chofer-guia.component.css']
})

export class ChoferGuiaComponent {
  myControl = new FormControl();
  options: chofer[]=[];
  Chofer: chofer[] = [];
  filteredOptions!: Observable<chofer[]>;

  constructor(
    public dialog: MatDialog,
    private choferService:ChoferService){      
  }

  ngOnInit(): void {
    this.choferService.getChofer().subscribe((resp:chofer[])=>{
      this.Chofer=resp;
      this.options=resp;
      console.log(this.Chofer)
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): chofer[] {
    let filterValue = value.toLowerCase();
    return this.options.filter(option => option!.nombre!.toLowerCase().includes(filterValue));
  }

  AbrirModalChofer(){
    const dialogRef = this.dialog.open(ChoferModalComponent, {
      data: this.Chofer, width:'1200px'
    });
    dialogRef.componentInstance.submitClicked.subscribe(result => {
      console.log(result);
      this.myControl.setValue(result);
    });
  }

  onSelectionChange(event: any){
  }

  displayFn(chofer: chofer): string {
    return chofer && chofer.nombre ? chofer.nombre : '';
  }
}
