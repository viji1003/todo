import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/http/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "in28minutes";
  password = '';
  errorMessage ="Invalid Credentials";
  invalidLogin = false;

  // Router 
  // Angular.giveMeRouter
  // Dependency Injection

  constructor(private router : Router,
    private hardcodedAuthenticationService:HardcodedAuthenticationService,
    private basicAuthenticationService:BasicAuthenticationService) { }

  ngOnInit() {
  }

  handleJWTAuthLogin() {
    
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['welcome', this.username])
            this.invalidLogin = false;
          },
          error => {
            console.log(error)
            this.invalidLogin = true;
          }
        )
}

  handleBasicAuthLogin() {
    
      this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
          .subscribe(
            data => {
              console.log(data)
              this.router.navigate(['welcome', this.username])
              this.invalidLogin = false;
            },
            error => {
              console.log(error)
              this.invalidLogin = true;
            }
          )
  }

  handleLogin() {
    // if(this.username==="in28minutes" && this.password==="dummy") {
      if(this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
      // Redirect to Welcome Page
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }
}
