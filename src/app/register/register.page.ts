import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  firstName : any
  lastName : any
  email : any
  password : any
  success: string;
  error: string;
  constructor(
    private router: Router,
    private auth : AuthService
  ) { }

  ngOnInit() {
  }

  handleRegistration()
  {
    const {firstName, lastName, email, password} = this;
    this.auth.registerUser(email,password,firstName,lastName)
    .then(() => {
      this.success = "Registration Successfull";
      this.error = "";
      this.router.navigateByUrl('/login')
    })
    .catch(err => {
      this.error = err;
      this.success = ""
    });
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }
  

}
