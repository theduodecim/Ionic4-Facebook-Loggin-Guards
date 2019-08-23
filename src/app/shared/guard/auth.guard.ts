import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public authService: AuthService) { }


  canActivate(route: ActivatedRouteSnapshot): any {
    console.log(route);

    // tslint:disable-next-line:prefer-const
    let authInfo = {
      authenticated: this.authService.loggedIn
    };

    if (!authInfo.authenticated) {
      this.router.navigate(['login']);
      return false;
    }

    return true;

  }

}
