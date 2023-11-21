import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-observacion-guia',
  templateUrl: './observacion-guia.component.html',
  styleUrls: ['./observacion-guia.component.css']
})
export class ObservacionGuiaComponent {
  @Output()
  submitClicked = new EventEmitter<string>();
  panelOpenState = false;
  observacion:string|undefined;

  ObservacionChanged($event: KeyboardEvent) {
    this.observacion = ($event.target as HTMLInputElement).value;
    this.submitClicked.emit(this.observacion);
  }
}
