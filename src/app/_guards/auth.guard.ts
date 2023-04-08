import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService,

  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var tokenUser = sessionStorage.getItem('@Mercator:tokenUser');
    if (tokenUser) {
      this.authService.saveUser(JSON.parse(tokenUser));
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
