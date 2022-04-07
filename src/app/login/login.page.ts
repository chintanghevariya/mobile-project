import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  password: string = "";

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  navigateToRegister(){
    this.router.navigate(["/register"])
  }

  async loginUser() {
    const { email, password } = this;
    this
      .authService
      .loginUser(email, password)
      .then(console.log);
  }

}
