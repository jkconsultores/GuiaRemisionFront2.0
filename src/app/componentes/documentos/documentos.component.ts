import { Component, EventEmitter, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { DocumentosModalComponent } from 'src/app/modals/documentos-modal/documentos-modal.component';
import { docReferenciado } from 'src/models/docRef';
import { DocumentoService } from 'src/services/documento.service';


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
})

export class DocumentosComponent {
  Documentos:docReferenciado[]=[];
  options: docReferenciado[]=[];
  docReferenciado: docReferenciado[] = [];
  myControl = new FormControl();
  filteredOptions!: Observable<docReferenciado[]>;
  submitClicked = new EventEmitter<docReferenciado>();
  
  hidden = false;

  constructor(
    public dialog: MatDialog,
    private DocumentoService: DocumentoService
    ){}

  ngOnInit(): void {
    this.DocumentoService.getDocReferenciado().subscribe((resp:docReferenciado[])=>{
      this.docReferenciado=resp;
      this.options=resp;
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): docReferenciado[] {
    let filterValue = (typeof value === 'string') ? value.toLowerCase() : '';
    return this.options.filter(option => option!.numeroDocumentoDocRel!.toLowerCase().includes(filterValue));
  }

  openModal(){
    this.hidden = !this.hidden;
    console.log('datolength', this.Documentos.length);
    const dialogRef = this.dialog.open(DocumentosModalComponent, {
      data: this.Documentos, width:'1000px'
    });    
    dialogRef.componentInstance.submitClicked.subscribe(result => {
      this.myControl.setValue(result);
      this.submitClicked.emit(result)
    });
  }

}
