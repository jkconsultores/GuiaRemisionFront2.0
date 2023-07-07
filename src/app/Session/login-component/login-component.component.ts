import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { T_MenuGre } from 'src/models/T_menu';
import { UsuarioLoginDTO, UsuariosDTO } from 'src/models/Usuarios';
import { AuthServiceServiceService } from 'src/services/auth-service-service.service';
import { MenuService } from 'src/services/menu.service';
import { SessionServiceService } from 'src/services/session-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit{

  public usuario!: UsuarioLoginDTO;

  public formGroup: FormGroup = this.formBuilder.group({
    empresa: new FormControl(''),
    nombreusuario: new FormControl(''),
    contrasena: new FormControl(''),
  });

  recordarme = false;

  constructor(private auth:AuthServiceServiceService,private session:SessionServiceService,private menu:MenuService,private router:Router,private formBuilder: FormBuilder){}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.formGroup.get("empresa")?.setValue(localStorage.getItem('emp')??"")
      this.formGroup.get("nombreusuario")?.setValue(localStorage.getItem('user')??"")
      this.recordarme=true;
    }
  }

  login() {
    // if (form.invalid) { Swal.fire({ icon: 'error', text: 'No se completo los campos' }); }
    // console.log(form.value);
    this.usuario=this.formGroup.value!;
    console.log(this.usuario!.empresa!);
    this.usuario.empresa=this.usuario!.empresa!.toLowerCase().trim();
    this.usuario.nombreusuario=this.usuario!.nombreusuario!.toLowerCase().trim();
    this.usuario.contrasena=this.usuario!.contrasena!.toLowerCase().trim();
    Swal.showLoading();
    this.session.login(this.usuario).subscribe((res:any) => {
    this.validarUsuario(res);
    }, err => {
      Swal.fire({ icon: 'warning', text: 'hubo un error en la conexion al servidor' });
    });

  }

/*   this.api.obtenerPermisoToken().subscribe((res: any) => {
    this.token = res[0].token;} */
  validarUsuario(res:any):any{
    if (Object.entries(res).length > 0) {
      if (this.recordarme) {
        localStorage.setItem('user', this.usuario.nombreusuario);
        localStorage.setItem('emp', this.usuario.empresa.toLowerCase());

      }else{
        localStorage.removeItem('user');
        localStorage.removeItem('emp');
      }
      Swal.close();
      this.auth.SessionSaved(res.token);
      this.auth.UserSaved(res.usuario);
      // localStorage.setItem('token',res.token);
      localStorage.setItem('emp',this.usuario.empresa.toLowerCase());
      this.menu.getMenu().subscribe((resp:T_MenuGre[])=>{
        console.log(resp)
        if(resp.length < 1){
           return Swal.fire({
          title: 'Mensaje',
          icon: 'warning',
          text: 'Las rutas no han sido configuradas'
        })
        }
        return this.router.navigateByUrl("plataforma/"+resp[0].ruta);
      })
    } else {
      return Swal.fire({
        title: 'Mensaje',
        icon: 'warning',
        text: 'No se encontro ningun usuario'
      })
    }
  }
}
