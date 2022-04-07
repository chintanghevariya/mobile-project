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
  error: string = "";
  success: string = "";

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  navigateToRegister(){
    this.router.navigate(["/register"])
  }

  loginUser() {
    const { email, password } = this;
    this
      .authService
      .loginUser(email, password)
      .then(() => {
        this.success = "Logged in";
        this.error = "";
        this.router.navigateByUrl('/list')
      })
      .catch(err => {
        this.error = err;
        this.success = ""
      });
  }

}
