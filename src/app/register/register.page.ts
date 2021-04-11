import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private fireauth : AngularFireAuth) {
    
  }


  ngOnInit() {
  }

}
