import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  firstName : string =''
  lastName : string =''
  email : string =''
  password : string =''
  success: string;
  error: string;
  disable:boolean=true
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
  onChange(ev:any){
    if(ev.target.value === ''){
      this.disable = true
    }
    else if(this.firstName ==='' || this.lastName === ''||this.email ===""||this.password ==="")
    {
      this.disable = true
    }
    else{
      this.disable = false
    }
  }
  goToLogin() {
    this.router.navigate(["/login"]);
  }
  

}
