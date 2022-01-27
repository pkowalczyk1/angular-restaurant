import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {AuthServiceService} from "../../services/authService/auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class ManagerGuardGuard implements CanActivate {
  constructor(public auth: AuthServiceService, public router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.currentUser.pipe(
      take(1),
      map(user => !!user && !!user.roles.manager)
    );
  }
}
