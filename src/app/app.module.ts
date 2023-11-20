import { LOCALE_ID, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import myLocaleEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponentComponent } from './Session/login-component/login-component.component';
import { RegisterComponentComponent } from './Session/register-component/register-component.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ApiInterceptorServiceService } from 'src/services/interceptor/api-interceptor-service.service';
import { GreComponent } from './dashboard/gre/gre.component';
import { PlataformaComponent } from './plataforma/plataforma.component';
import { MaterialModule } from 'src/material/material.module';
import { CabeceraGuiaComponent } from './componentes/cabecera/cabecera-guia/cabecera-guia.component';
import { EmpresaModalComponent } from './modals/empresa-modal/empresa-modal.component';
import { SerieModalComponent } from './modals/serie-modal/serie-modal.component';
import { DestinatarioModalComponent } from './modals/destinatario-modal/destinatario-modal.component';
import { DestinoModalComponent } from './modals/destino-modal/destino-modal.component';
import { OrigenModalComponent } from './modals/origen-modal/origen-modal.component';
import { DestinatarioGuiaComponent } from './componentes/destinatario-guia/destinatario-guia.component';
import { ItemsGuiaComponent } from './componentes/items-guia/items-guia.component';
import { ItemsModalComponent } from './modals/items-modal/items-modal.component';
import { CreacionItemsModalComponent } from './modals/creacion-items-modal/creacion-items-modal.component';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { UsuarioModalComponent } from './modals/usuario-modal/usuario-modal.component';
import { EmpresaComponentComponent } from './componentes/empresa-component/empresa-component.component';
import { DestinoComponentComponent } from './componentes/destinatario-guia/destino-component/destino-component.component';
import { EditDestinoComponentComponent } from './modals/destino-modal/edit-destino-component/edit-destino-component.component';
import { EditOrigenComponentComponent } from './modals/origen-modal/edit-origen-component/edit-origen-component.component';
import { OrigenComponentComponent } from './componentes/origen-component/origen-component.component';
import { EditEmpresaComponentComponent } from './modals/empresa-modal/edit-empresa-component/edit-empresa-component.component';
import { EditDestinatarioComponentComponent } from './modals/destinatario-modal/edit-destinatario-component/edit-destinatario-component.component';
import { ChoferGuiaComponent } from './componentes/chofer-guia/chofer-guia.component';
import { ChoferModalComponent } from './modals/chofer-modal/chofer-modal.component';
import { EditChoferComponent } from './modals/chofer-modal/edit-chofer/edit-chofer.component';
import { GreTransportistaComponent } from './dashboard/gre-transportista/gre-transportista.component';
import { GreReportesComponent } from './reportes/gre-reportes/gre-reportes.component';

registerLocaleData(myLocaleEs)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    GreComponent,
    PlataformaComponent,
    CabeceraGuiaComponent,
    EmpresaModalComponent,
    SerieModalComponent,
    DestinatarioModalComponent,
    DestinoModalComponent,
    OrigenModalComponent,
    DestinatarioGuiaComponent,
    ItemsGuiaComponent,
    ItemsModalComponent,
    CreacionItemsModalComponent,
    UsuariosComponent,
    UsuarioModalComponent,
    EmpresaComponentComponent,
    DestinoComponentComponent,
    EditDestinoComponentComponent,
    EditOrigenComponentComponent,
    OrigenComponentComponent,
    EditEmpresaComponentComponent,
    EditDestinatarioComponentComponent,
    ChoferGuiaComponent,
    ChoferModalComponent,
    EditChoferComponent,
    GreTransportistaComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    MaterialModule,
    BrowserAnimationsModule,
    GreReportesComponent
  ],
  providers: [{provide:LOCALE_ID,useValue:'es'},{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorServiceService, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
