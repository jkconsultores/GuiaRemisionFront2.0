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
