import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { EmpresaModalComponent } from 'src/app/modals/empresa-modal/empresa-modal.component';
import { AAA_EMPRESA } from 'src/models/Empresa';
import { EmpresaService } from 'src/services/empresa.service';

@Component({
  selector: 'app-empresa-component',
  templateUrl: './empresa-component.component.html',
  styleUrls: ['./empresa-component.component.css']
})

export class EmpresaComponentComponent {
  myControl = new FormControl();
  options: AAA_EMPRESA[]=[];
  Empresas:AAA_EMPRESA[]=[];
  filteredOptions!: Observable<AAA_EMPRESA[]>;

  constructor(public dialog: MatDialog,private empresaService:EmpresaService){}

  ngOnInit(): void {
    //RucAdquiriente
      this.empresaService.getEmpresas().subscribe((resp:AAA_EMPRESA[])=>{
        this.Empresas=resp;
        this.options=resp;
        console.log(this.Empresas)
      })
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );

  }

  AbrirModalDeEmpresa(){
    const dialogRef = this.dialog.open(EmpresaModalComponent, {
      data: this.Empresas, width:'1000px'
    });

    dialogRef.componentInstance.submitClicked.subscribe(result => {
      console.log(result);
      this.myControl.setValue(result);
    });
  }
  private _filter(value: string): AAA_EMPRESA[] {
    let filterValue = value.toLowerCase();
    return this.options.filter(option => option!.nombreempresa!.toLowerCase().includes(filterValue));
  }
  displayFn(country: AAA_EMPRESA): string {
    return country && country.nombreempresa ? country.nombreempresa : '';
  }
  
}
