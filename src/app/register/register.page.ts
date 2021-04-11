import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSvc : AuthService) {
    
  }


  ngOnInit() {
  }


  async onRegister(email, password){
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if(user){
        console.log('User->', user);
        //checkEmail
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

}
