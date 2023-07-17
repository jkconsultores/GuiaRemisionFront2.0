import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { PermisoDTO, T_Permiso } from 'src/models/Permiso';
import { RespuestaDeLLaveValor } from 'src/models/RespuestasGenericas';
import { USUARIO, UsuariosDTO } from 'src/models/Usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url=environment.urlApi;

  constructor(public http:HttpClient) { }

  public getUsuarios(){
    return this.http.get<USUARIO[]>(this.url+"Usuario");
  }
  public deleteUsuario(id:number){
    return this.http.post(this.url+"Usuario/delete/"+id,null);
  }
  public ActualziarUsuario(Usuario:USUARIO){
    return this.http.post(this.url+"Usuario/Update",Usuario);
  }
  public actualziarContraseña(pass:RespuestaDeLLaveValor){
    return this.http.post(this.url+"Usuario/CangePass",pass);
  }
  public CambiarAccesoUsuario(pass:RespuestaDeLLaveValor){
    return this.http.post(this.url+"Usuario/access",pass);
  }
  public agregarUsuario(usuario:UsuariosDTO){
    return this.http.post<USUARIO>(this.url+"Session/Register",usuario)
  }
  public AgregarPermisos(permisos:PermisoDTO[]){
    return this.http.post(this.url+'Roles',permisos)
  }
  public ActualizarPermisos(permisos:PermisoDTO[]){
    return this.http.post(this.url+'Roles/update',permisos)
  }
  public ObtenerRolesDeUsuario(usuarioId:number){
    return this.http.get<T_Permiso[]>(this.url+'Roles/'+usuarioId)
  }
  public VerificarAccesoAUsuario(){
    return this.http.get(this.url+"Usuario/AccesoAUsuarios")
  }
}
