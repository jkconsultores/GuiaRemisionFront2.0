export interface UsuariosDTO {
  nombreusuario: string;
  contrasena: string;
  nombres: string | null;
  correoelectronico: string | null;
}

export interface UsuarioLoginDTO {
  nombreusuario: string;
  contrasena: string;
  empresa: string;
}

export interface UsuariosReturnPortalDTO {
  id: number;
  usuario: string;
  empresa: string;
  expira: string;
  token: string;
  rol: boolean;
  observations: string;
  correo: string;
}
export interface USUARIO {
  usuarioid: number;
  nombreusuario: string;
  contrasena: string;
  nombres: string | null;
  rol: boolean;
  correoelectronico: string | null;
  estado:boolean;
}
