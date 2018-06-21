import { Component, } from '@angular/core';
import { ChatService } from "../../services/chat.service"; //SERVICIO PARA AUTF

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor( public chatS : ChatService) { }

  ingresar( proveedor:string ){
    console.log( proveedor );
    //ENVIO MI PROVEEDOR Y ACTIVO MI SERVICIO DE LOGIN
    this.chatS.login( proveedor );
  }


}
