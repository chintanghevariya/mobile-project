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
  disable: boolean=true
  isLoggedIn:boolean = !!localStorage.getItem('userName')

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if(this.isLoggedIn){
      this.router.navigateByUrl('list')
    }
  }

  navigateToRegister(){
    this.router.navigate(["/register"])
  }
  onChange(ev:any){
    if(ev.target.value === ''){
      this.disable = true
    }
    else if(this.email ===""||this.password ==="")
    {
      this.disable = true
    }
    else{
      this.disable = false
    }
  }
  loginUser() {
    const { email, password } = this;
    this
      .authService
      .loginUser(email, password)
      .then((data) => {
        this.success = "Logged in";
        this.error = "";
        localStorage.setItem('userName', data.firstName)
        this.router.navigateByUrl('/list')
      })
      .catch(err => {
        this.error = err;
        this.success = ""
      });
  }

}
