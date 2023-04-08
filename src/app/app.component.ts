import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './service/auth/auth.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuToogle: any = false;
  constructor(public router: Router, private authService: AuthService, private route: ActivatedRoute) {
    var tokenUser = sessionStorage.getItem('@Mercator:tokenUser');
    var language = localStorage.getItem('@Mercator:location');

    if (language) {
      this.authService.setLocation(language);
    } else {
      this.authService.setLocation('PT');
    }
    if (tokenUser) {
      this.authService.saveUser(JSON.parse(tokenUser));
    }

    this.authService.toogleMenu.subscribe((res: any) => {
      this.menuToogle = res;
    });
  }

  checkUrl(url: any) {
    if (url) {
      if (url.includes('login')) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}
