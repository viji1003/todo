import { Injectable } from '@angular/core';

// Make this component available for depedency injection
@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username, password) {
    // console.log('before' + this.isUserLoggedIn());
    if(username==="in28minutes" && password==="dummy") {
      sessionStorage.setItem('authenticateUser', username);
      // console.log('after' + this.isUserLoggedIn())
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticateUser')
    return !(user == null)
  }

  logout() {
    sessionStorage.removeItem('authenticateUser');
  }
}
