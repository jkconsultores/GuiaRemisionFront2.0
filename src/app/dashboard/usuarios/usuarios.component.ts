import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioModalComponent } from 'src/app/modals/usuario-modal/usuario-modal.component';
import { MOTIVOS } from 'src/models/Motivos';
import { T_Permiso, PermisoDTO } from 'src/models/Permiso';
import { RespuestaDeLLaveValor } from 'src/models/RespuestasGenericas';
import { USUARIO, UsuariosDTO } from 'src/models/Usuarios';
import { AAA_TIPODOCUMENTO } from 'src/models/aaa_TipoDocumento';
import { MotivosService } from 'src/services/motivos.service';
import { SerieService } from 'src/services/serie.service';
import { UsuarioService } from 'src/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent  implements OnInit {
  ELEMENT_DATA: USUARIO[] = [];
  serieNumero = '';
  motivo = '';
  correoUsuario='';
  nombreUserUsuario='';
  contraseñaUsuario='';
  filterUsuario='';
  TipoServicio='Serie';
  nombreUsuario='';
  passchange:RespuestaDeLLaveValor|undefined;
  RolesDEUSuario:T_Permiso[]=[]
  RolesDEUSuarioNuevos:PermisoDTO[]=[]
  usuarioEditado:number|undefined;


displayedColumns: string[] = ['Numero', 'Cantidad','nombre', 'NombreUsuario','Correo','Acceso','Rol','Opt'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(private usuariosService:UsuarioService,public dialog: MatDialog){}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  obtenerUsuarios(){
    this.usuariosService.getUsuarios().subscribe((resp:any)=>{
      this.ELEMENT_DATA=resp;
      this.dataSource.data=this.ELEMENT_DATA;
    })
  }
  async eliminarUsuario(idUsuario: number) {
    const result = await Swal.fire({
      title: '¿Estás seguro de borrar?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons:true,
      cancelButtonColor:'red',
      confirmButtonColor:'green'
    });
    if (!result.isConfirmed) {
      return;
    }
    this.usuariosService.deleteUsuario(idUsuario).subscribe(
      (resp:any) => {
        Swal.fire('Usuario eliminado satisfactoriamente', '', 'success');
        this.obtenerUsuarios();
      },
      error => {
        Swal.fire('No se pudo eliminar el usuario', '', 'error');
      }
    );
  }
  cambiarPass(usuario:USUARIO){
    Swal.fire({
      title: 'Introduce la nueva contraseña para el usuario: '+usuario.nombreusuario,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText:"Cancelar",
      confirmButtonText: 'Actualizar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        this.passchange={id:usuario.usuarioid.toString(),text:login}
        return this.usuariosService.actualziarContraseña(this.passchange).subscribe((resp:any)=>{

        },(error:any)=>{Swal.showValidationMessage(
          `Error: ${error}`
        )});
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Usuario modificado',
          text:'La ontraseña del usuario: '+usuario.nombreusuario+" fue actualizada correctamente"
        })
      }
    })
  }
  DarDeBaja(usuario:USUARIO){

    let estado =1;
    let estadoDatos ="retirar";
    let estadoDatos1 ="retirado";
    if(usuario.estado){estado=0;estadoDatos="retirar";estadoDatos1='retirado'}else{estado=1;estadoDatos="brindar";estadoDatos1='brindado'}
    this.passchange={id:usuario.usuarioid.toString(),text:estado.toString()}

    Swal.fire({
      title: 'Atencion!',
      text: "Estas seguro que deseas "+estadoDatos+" el acceso al usuario "+ usuario.nombreusuario ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: estadoDatos+' acceso!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.CambiarAccesoUsuario(this.passchange!).subscribe((resp:any)=>{
          this.obtenerUsuarios();
          Swal.fire({
            title:"Felicidades",
            text:"Los accesos fueron "+estadoDatos1
          });
        })
      }
    })
  }
  editaRoles(usuario:USUARIO){
    // this.RolesDEUSuarioNuevos=[];
    // this.usuarioEditado = usuarioId;
    const dialogRef = this.dialog.open(UsuarioModalComponent, {
      data: {nombreusuario:usuario.nombreusuario,contrasena:usuario.contrasena,nombres:usuario.nombres,correoelectronico:usuario.correoelectronico,rol:usuario.rol,usuarioid:usuario.usuarioid},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    // this.modalRef = this.modalService.open(ModalTemplate, { size: 'lg' });
    // this.usuariosService.ObtenerRolesDeUsuario(usuarioId).subscribe((resp:any)=>{
    //   this.RolesDEUSuario=resp
    //   this.RolesDEUSuario.forEach(x=> this.RolesDEUSuarioNuevos.push({
    //     estado:x.estado,
    //     idUsuario :x.idUsuario,
    //     tipo:x.tipo,
    //     valor:x.valor
    //   }))
    // })
  }
  openDialogItems() {
    const dialogRef = this.dialog.open(UsuarioModalComponent, {
      data: {nombreusuario:'',contrasena:'',nombres:'',correoelectronico:'',rol:false,usuarioid:undefined},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
