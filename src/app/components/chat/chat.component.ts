import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  mensaje:string = "";
  elemento:any;

  constructor( public chatS : ChatService) {

    this.chatS.cargarMensajes()
              .subscribe( ()=>{
                //El TimeOut da espera a que mi ngOnInit cargue el id app-mensajes
                setTimeout( ()=>{
                  //Apunta el scroll al último mensaje siempre.
                  this.elemento.scrollTop = this.elemento.scrollHeight;
                }, 20);

    });
  }

  ngOnInit(){
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje(){
    console.log(this.mensaje);

    if( this.mensaje.length == 0){
      return;
    } else{
      this.chatS.agregarMensaje( this.mensaje )
      //detecta si el mensaje se envio correctamente
      .then ( ()=>console.log('Mensaje enviado correctamente') );
      //Después de enviar el mensaje, se vacía la caja de texto de los mensajes
      this.mensaje = "";
    }
  }

}
