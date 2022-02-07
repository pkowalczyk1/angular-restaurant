import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {AuthServiceService} from "../../services/authService/auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(public auth: AuthServiceService, public router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.currentUser.pipe(
      take(1),
      map(user => {
        if (user == null || user.roles.admin == false) {
          this.router.navigate(['list']);
          return false;
        }
        return true;
      })
    );
  }
}
