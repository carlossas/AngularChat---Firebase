import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
 /*NECESARIO PARA ENVIAR DATOS POR FORMULARIO NGMODEL*/
 import { FormsModule } from '@angular/forms';
 /*IMPORTACIONES PARA ANGULARFIRE2*/
 import { AngularFireModule } from 'angularfire2';
 import { AngularFirestoreModule } from 'angularfire2/firestore';
 import { AngularFireStorageModule } from 'angularfire2/storage';
 import { AngularFireAuthModule } from 'angularfire2/auth';
 import { environment } from '../environments/environment';

 /*COMPONENTES DEL CHAT*/
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';

/*SERVICIOS DEL CHAT*/
import { ChatService } from './services/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
