import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({selector:'recuperar-senha-page',imports:[FormsModule,RouterLink],templateUrl:'./recuperar-senha.html',styleUrl:'./recuperar-senha.css'})
export class RecuperarSenha {
  registration='';email='';submitted=false;sent=false;
  send():void{this.submitted=true;if(!this.registration.trim()||!this.email.trim())return;this.sent=true}
}
