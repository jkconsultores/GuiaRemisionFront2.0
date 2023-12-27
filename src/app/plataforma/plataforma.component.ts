import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-plataforma',
  templateUrl: './plataforma.component.html',
  styleUrls: ['./plataforma.component.css']
})
export class PlataformaComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  panelOpenState = false;

  constructor(private router:Router) { }

  //crea una funcion para valdiar el ultimo parametro de a url que retorne el valor active validando por un if
  public activeRoute(routename: string): boolean {
      return this.router.url.indexOf(routename) > -1;
  }

  public changeRoute(routename: string) {
    this.sidenav.close();
    return this.router.navigate([routename]);
  }

}
