import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = new BehaviorSubject(undefined);
  authToken = new BehaviorSubject(undefined);
  currentClient = new BehaviorSubject(undefined);
  currentLocation = new BehaviorSubject(undefined);
  currentLocationJson = new BehaviorSubject(undefined);
  toogleMenu = new BehaviorSubject(undefined);


  constructor(private router: Router) { }

  async loginUser(tokenUser: any, url = "") {
    await sessionStorage.setItem('@Mercator:tokenUser', JSON.stringify(tokenUser));
    var decode: any = jwt_decode(tokenUser);
    await this.authToken.next(tokenUser);
    await this.currentUser.next(decode);
    this.router.navigate(['home']);
  }

  async saveUser(tokenUser: any) {
    await sessionStorage.setItem('@Mercator:tokenUser', JSON.stringify(tokenUser));
    var decode: any = jwt_decode(tokenUser);
    await this.authToken.next(tokenUser);
    await this.currentUser.next(decode);
  }

  async logoutUser() {
    await sessionStorage.clear();
    await this.authToken.next(undefined);
    await this.currentUser.next(undefined);
    await this.toogleMenu.next(undefined);
    this.router.navigate(['login']);
  }


  async authCheck(tokenUser: any) {
    await sessionStorage.setItem('@Mercator:tokenUser', JSON.stringify(tokenUser));
    var decode: any = jwt_decode(tokenUser);
    await this.authToken.next(tokenUser);
    await this.currentUser.next(decode);
  }

  async setLocation(location: any) {
    await localStorage.setItem('@Mercator:location', location);
    await this.currentLocation.next(location);
  }


  async setLocationJson(location: any) {
    await localStorage.setItem('@Mercator:locationJson', JSON.stringify(location));
    await this.currentLocationJson.next(location);
  }

  async setAtualizarMenu(att: any) {
    await this.toogleMenu.next(att);
  }
}
