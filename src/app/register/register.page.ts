import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSvc : AuthService, private router:Router) {
    
  }


  ngOnInit() {
  }


  async onRegister(email, password){
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if(user){
        console.log('User->', user);
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
        //checkEmail
      }
    } catch (error) {
      console.log('Error', error)
    }
  }


  private redirectUser(isverified:boolean): void{
    if(isverified){
      this.router.navigate(['home']);
    }else{
      //else verificationPage
      this.router.navigate(['verify-email']);
    }
    
  }

}
