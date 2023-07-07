import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './Session/login-component/login-component.component';
import { GreComponent } from './dashboard/gre/gre.component';
import { PlataformaComponent } from './plataforma/plataforma.component';
import { SessionGuardGuard } from 'src/guard/session-guard.guard';

const routes: Routes = [
  {path:'',component:LoginComponentComponent},
  {path:'login',component:LoginComponentComponent},
  {path:'*',component:LoginComponentComponent},
  {path:'plataforma',canActivate: [SessionGuardGuard],component:PlataformaComponent,children:[
    {path:'main',component:GreComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
