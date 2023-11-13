import { Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { DestinoModalComponent } from 'src/app/modals/destino-modal/destino-modal.component';
import { OrigenModalComponent } from 'src/app/modals/origen-modal/origen-modal.component';
import { Aaa_OrigenDTO } from 'src/models/origen';
import { DestinosService } from 'src/services/destinos.service';
import { OrigenService } from 'src/services/origen.service';

@Component({
  selector: 'app-origen-component',
  templateUrl: './origen-component.component.html',
  styleUrls: ['./origen-component.component.css']
})
export class OrigenComponentComponent {
  @Input()
  RucEmisor!:string;

  @ViewChild(MatAutocompleteTrigger) _auto!: MatAutocompleteTrigger;
  myControl = new FormControl();
  options: Aaa_OrigenDTO[]=[];
    filteredOptions!: Observable<Aaa_OrigenDTO[]>;
    Destinos:Aaa_OrigenDTO[]=[];

    constructor(public dialog: MatDialog,private destinosService:OrigenService){}

    ngOnInit(): void {
      //RucAdquiriente
        this.destinosService.ObtenerTodosLosOrigenDeUnAdquiriente(this.RucEmisor).subscribe((resp:Aaa_OrigenDTO[])=>{
          this.Destinos=resp;
          this.options=resp;
          console.log(this.Destinos)
        })
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );

    }
    onSelectionChange(event: any){
      console.log(event.option.value);

    }
    AbrirModalDeDestino(){
      const dialogRef = this.dialog.open(OrigenModalComponent, {
        data: this.Destinos,width:'1000px'
      });

      dialogRef.componentInstance.submitClicked.subscribe(result => {
        console.log(result);
        this.myControl.setValue(result);
      });
    }
    private _filter(value: string): Aaa_OrigenDTO[] {
      let filterValue = value.toLowerCase();
      return this.options.filter(option => option!.direccionorigen!.toLowerCase().includes(filterValue));
    }
    displayFn(country: Aaa_OrigenDTO): string {
      return country && country.direccionorigen ? country.direccionorigen : '';
    }
  }
