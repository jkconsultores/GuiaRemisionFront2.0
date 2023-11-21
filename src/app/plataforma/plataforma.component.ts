import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plataforma',
  templateUrl: './plataforma.component.html',
  styleUrls: ['./plataforma.component.css']
})
export class PlataformaComponent {
  panelOpenState = false;

  constructor(private router:Router) { }

  //crea una funcion para valdiar el ultimo parametro de a url que retorne el valor active validando por un if
  public activeRoute(routename: string): boolean {
      return this.router.url.indexOf(routename) > -1;
  }
}
