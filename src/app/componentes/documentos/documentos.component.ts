import { Component, EventEmitter, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { DocumentosModalComponent } from 'src/app/modals/documentos-modal/documentos-modal.component';
import { docReferenciado } from 'src/models/docRef';


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
})

export class DocumentosComponent {
  options: docReferenciado[]=[];
  docReferenciado: docReferenciado[] = [];
  myControl = new FormControl();
  filteredOptions!: Observable<docReferenciado[]>;
  submitClicked = new EventEmitter<docReferenciado>();
  hidden = true;
  constructor(
    public dialog: MatDialog, 
    ){}

  ngOnInit(): void {
    
  }

  openModal(){
    if(this.docReferenciado.length>0){
      this.hidden = false;
    }
    console.log('datolength', this.docReferenciado.length);
    const dialogRef = this.dialog.open(DocumentosModalComponent, {
      data: this.docReferenciado, width:'1000px'
    });
    dialogRef.componentInstance.submitClicked.subscribe(result => {
      debugger;
      this.myControl.setValue(result);
      this.submitClicked.emit(result)
      //this.Documentos = result;
    });
    //dialogRef.afterClosed().subscribe(result => {
    //  debugger;
    //  console.log(`Dialog result2222222222222: ${result}`);
    //  if (result !== undefined) {
    //    this.Documentos = result;
    //  }      
    //});
  }

}
