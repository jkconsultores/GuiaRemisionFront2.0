import { Component, ElementRef, Inject, Input, OnInit, ViewChild, inject } from '@angular/core';
import { USUARIO, UsuariosDTO } from 'src/models/Usuarios';
import { ItemsModalComponent } from '../items-modal/items-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AAA_TIPODOCUMENTO } from 'src/models/aaa_TipoDocumento';
import { MOTIVOS } from 'src/models/Motivos';
import { MotivosService } from 'src/services/motivos.service';
import { SerieService } from 'src/services/serie.service';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PermisoDTO, T_Permiso } from 'src/models/Permiso';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/services/usuario.service';
import { EmpresaService } from 'src/services/empresa.service';
import { T_UsuarioEmpresaDTO } from 'src/models/Empresa';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.css']
})
export class UsuarioModalComponent implements OnInit {
  titulo:string="";
  boton:string="Agregar usuario";
  arraySerie:AAA_TIPODOCUMENTO[] = [];
  arrayMotivo:MOTIVOS[]=[];
  serieNumero = '';
  TipoServicio='Serie';
  public permisos:PermisoDTO[] =[];
  empresas:any=[];

  //CHIPS
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  Motivos:string[]=[];
  TodosLosMotivos:string[]=[];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  announcer = inject(LiveAnnouncer);

  constructor(
    public dialogRef: MatDialogRef<ItemsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: USUARIO,private seriesService:SerieService, private motivosService:MotivosService,private usuarioService:UsuarioService,private EmpresasService:EmpresaService
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.TodosLosMotivos.slice())),
    );
  }
  ngOnInit(): void {
    this.getEmpresas();
    if(this.data.usuarioid!=undefined){
      this.usuarioService.ObtenerRolesDeUsuario(this.data.usuarioid).subscribe((resp:T_Permiso[])=>{
        this.permisos=resp
      })
    }
    this.seriesService.getSerie().subscribe((resp:any)=>{
      this.arraySerie=resp
    },error=>{
    });
    this.motivosService.GetMotivos().subscribe((resp:any)=>{
      this.arrayMotivo=resp;
      resp.forEach((element:MOTIVOS) => {
        this.TodosLosMotivos.push(element.descripcion)
      });
    })
    if(this.data.usuarioid==undefined){
      this.titulo="Crear usuario"
      this.boton="Agregar usuario"
    }else{
      this.titulo ="Editar usuario"
      this.boton="Actualizar usuario"
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }
  EnvioDatos(){
    if(this.data.nombres==''){
      return true
    }else if(this.data.nombreusuario == ''){
      return true
    }else if(this.data.contrasena == ''){
      return true
    }else if(this.data.correoelectronico == ''){
      return true
    }else{
      return false
    }
  }



  // CHIPS

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.Motivos.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }
  remove(fruit: string): void {
    const index = this.Motivos.indexOf(fruit);

    if (index >= 0) {
      this.Motivos.splice(index, 1);
      this.TodosLosMotivos.push(fruit)
      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.Motivos.push(event.option.viewValue);
    const index = this.TodosLosMotivos.indexOf(event.option.viewValue);
    if (index !== -1) {
      this.TodosLosMotivos.splice(index, 1);
    }
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.TodosLosMotivos.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
  //FIN DE CHIPS

  AgregarPermisos(){
    console.log(this.serieNumero)
    console.log(this.TipoServicio)
    let valor ="";
    let numeroDocumento ="";
    if(this.TipoServicio=="Serie"){
      valor=this.serieNumero.split("-")[1]
      numeroDocumento = this.serieNumero.split("-")[0]
    }
    else{
      this.Motivos.forEach(x=>{
        const motivo =this.arrayMotivo.find(y=>y.descripcion==x);
        if (motivo) {
          valor=motivo.id.toString()
          if(!this.permisos.some(x=>x.tipo==this.TipoServicio && x.valor==motivo.id.toString())){
            this.permisos.push({
              estado:true,
              idUsuario:0,
              tipo:this.TipoServicio,
              valor:valor,
              numeroDocumentoEmisor:''
            })
          }
        }
      })
    }
    if(valor!="" && valor!=undefined){
    if(!this.permisos.some(x=>x.tipo==this.TipoServicio && x.valor==valor && x.numeroDocumentoEmisor==numeroDocumento)){
      this.permisos.push({
        estado:true,
        idUsuario:0,
        tipo:this.TipoServicio,
        valor:valor,
        numeroDocumentoEmisor:numeroDocumento
      })
    }      // valor=this.motivo
    }

  }
  reemplazarMotivo(tipo: string, valor: string): string {
    if (tipo === "Motivo") {
      const index = this.arrayMotivo.findIndex((dato) => dato.id.toString() === valor);
      if (index !== -1) {
        return this.arrayMotivo[index].descripcion;
      }
    }
    return valor;
  }
  retirarPermiso(tipo:string,valor:string){
    this.permisos = this.permisos.filter((permiso) => {
      return !(permiso.tipo === tipo && permiso.valor === valor);
    });
  }
  acction(){
    console.log("Esta en action")
    console.log(this.data)
    console.log("Esta fuera de action")

    if(this.data.usuarioid==undefined){
      var empresasSeleccionadas=this.empresas.filter((elemento:any) => elemento.seleccionado);
      var usuarioEmpresa=[] as T_UsuarioEmpresaDTO[];
      this.usuarioService.agregarUsuario(this.data).subscribe((resp:any)=>{
        this.permisos.forEach((permiso) => {
          permiso.idUsuario = resp.usuarioid;
          this.AgregarPermisosAUsuarios()
          empresasSeleccionadas.forEach((element:any) => {
            usuarioEmpresa.push({idUsuario:resp.usuarioid,rucEmpresa:element.numerodocumentoemisor,estado:true})
          });
          this.agregarRelacionEmpresas(usuarioEmpresa);
        });
      },error=>{
        Swal.fire("No se pudo crear el usuario","","error")
      });
    }else{
      this.usuarioService.ActualziarUsuario(this.data).subscribe((resp:any)=>{
        this.actualziarPermisos();
      })
    }
  }
  AgregarPermisosAUsuarios(){
    this.usuarioService.AgregarPermisos(this.permisos).subscribe((resp:any)=>{
      Swal.fire({text:"Usuario creado satisfactoriamente",title:"",icon:"success",showCancelButton:false,confirmButtonText:"Ok"}).then((result) => {
        if (result.isConfirmed) {
          this.dialogRef.close();
        }
      });
    })
  }
  actualziarPermisos(){
    this.permisos.forEach((permiso) => {
      permiso.idUsuario = this.data.usuarioid;
    });
    this.usuarioService.ActualizarPermisos(this.permisos).subscribe((resp:any)=>{
      this.dialogRef.close();
      Swal.fire({
        title:"Felicidades",
        text:"Los accesos fueron actualizados"
      });
    });
  }
  getEmpresas(){
    this.EmpresasService.getEmpresas().subscribe((a:any)=>{
      a.forEach((element: any) => {
        element['seleccionado']=false;
      });
      this.empresas=a;
      console.log(a)
    })
  }
  agregarRelacionEmpresas(relacion:any){
    this.EmpresasService.AgregarRelacionEmpresas(relacion).subscribe(a=>{
      console.log(a)
    })
  }
}
