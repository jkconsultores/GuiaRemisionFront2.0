import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './Session/login-component/login-component.component';
import { GreComponent } from './dashboard/gre/gre.component';
import { PlataformaComponent } from './plataforma/plataforma.component';
import { SessionGuardGuard } from 'src/guard/session-guard.guard';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { EmpresaComponentComponent } from './componentes/empresa-component/empresa-component.component';
import { DestinoComponentComponent } from './componentes/destinatario-guia/destino-component/destino-component.component';
import { OrigenComponentComponent } from './componentes/origen-component/origen-component.component';
import { DestinatarioGuiaComponent } from './componentes/destinatario-guia/destinatario-guia.component';
import { ChoferGuiaComponent } from './componentes/chofer-guia/chofer-guia.component';
import { GreReportesComponent } from './reportes/gre-reportes/gre-reportes.component';
import { DocValidationComponent } from './doc-validation/doc-validation.component';


const routes: Routes = [
  {path:'',component:LoginComponentComponent},
  {path:'login',component:LoginComponentComponent},
  {path:'*',component:LoginComponentComponent},
  {path:'plataforma',
    canActivate: [SessionGuardGuard],
    component:PlataformaComponent,
    children:[
      {path:'',component:GreComponent},
      {path:'main',component:GreComponent},
      {path:'usuarios',component:UsuariosComponent},
      {path:'empresas',component:EmpresaComponentComponent},
      {path:'origenes',component:OrigenComponentComponent},
      {path:'destinos',component:DestinoComponentComponent},
      {path:'destinatario',component:DestinatarioGuiaComponent},
      {path:'chofer', component:ChoferGuiaComponent },
      {path:'reporte', component:GreReportesComponent},
      {path:'docvalidado', component:DocValidationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
