import { Injectable } from '@angular/core';
/*IMPORTACION NECESARIO PARA ANGULARFIRE*/
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
//AUTENTICACION CON GOOGLE Y TWIITER
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//INTERFAZ DE MENSAJES
import { Mensaje } from "../interfaces/mensaje.interface";

@Injectable()
export class ChatService {
  //Se debe inicializar para poder usar angularfire, de tipo Mensaje ya que
  // es lo que estoy recibiendo
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  //Variable que recibira los mensajes de firebase
  public chats: Mensaje[] = [];

  //Aquí recibo los valores de la autentificacion del user
  public usuario : any = {};

  constructor( private afs: AngularFirestore, //uso de la base de datos
               public afAuth: AngularFireAuth ){  //uso de la AUTENTICACION
  //suscribo a la autenficacion para tomar los valores del user
  this.afAuth.authState.subscribe( user =>{
      console.log ( "Estado del usuario: ", user );
      //si no se ha autentcado, returna vacio
      if ( !user ){
        return;
      }
      //Valores que puedo tomar del usuario
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      this.usuario.picture = user.photoURL;
  })

  }

  //AUTENTICACION CON ANGULARFIR2 GOOGLE, FACEBOOK, TWITTER
  login( proveedor : string ) {
  if (proveedor == 'google'){ //google
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  if (proveedor == 'twitter') { //twitter
    this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }
  if (proveedor == 'facebook') { //facebook
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  }

  logout() {
  this.afAuth.auth.signOut();
  this.usuario = {};
  }

  cargarMensajes(){
    //Cargo una coleccion de FireBase
    this.itemsCollection = this.afs.collection<Mensaje>('chats',
    ref => ref.orderBy('fecha', 'desc') //HAGO UNA CONSULTA P0ARA ORDENAR LOS CAMPOS POR FECHA DESCENDENTE
    .limit(5)); //LIMITA A SOLO MOSTRAR LOS ULTIMOS 5 MENSAJES

    //recibo mi arreglo de mensajes
    return this.itemsCollection.valueChanges().map ( (mensajes:Mensaje[]) =>{
      console.log(mensajes);
      //Inicializo mi arreglo de chats, vacio.
      this.chats = [];
      //ciclo para ordenar mis mensajes por fecha ascendente
      for ( let mensaje of mensajes ){
        this.chats.unshift( mensaje )
      }
      //RETORNA EL VALOR DE CHATS
      return this.chats;
      //tomo el valor de mensajes y lo envio a mi arreglo de chats
      //this.chats = mensajes;
    });
  }


  agregarMensaje( texto:string ){
    let mensaje : Mensaje ={
      nombre: this.usuario.nombre,
      mensaje : texto,
      fecha : new Date().getTime(),
      uid : this.usuario.uid
    }
    //retorna mi arreglo de mensajes
    return this.itemsCollection.add( mensaje );

  }
}
