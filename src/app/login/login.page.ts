import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }


  async onLogin(email, password){
    try {
      const user = await this.authSvc.login(email.value, password.value);

      if(user){
        const isVerified = this.authSvc.isEmailVerified(user);
        console.log('verified->', isVerified);
      }
    } catch (error) {
      console.log('Error->', error)
    }
  }

  async  onLoginGoogle(){
    try {
      const user = await this.authSvc.loginGoogle();
      if(user){
        //to do: checEmail
        const isVerified = this.authSvc.isEmailVerified(user);
        console.log('verified->', isVerified);
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

}
