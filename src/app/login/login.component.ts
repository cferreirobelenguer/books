import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email: string;
  public password: string;

  constructor (
    private route: Router
  ) {
    this.email = '';
    this.password = '';
  }

  public handleLogin () {
    console.log('Email: ',this.email);
    console.log('password: ',this.password)
  }

  //redirect register
  public handleRedirectRegister() {
    this.route.navigate(['register']);
  }
} 
