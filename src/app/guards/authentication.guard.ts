import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {

  constructor(private authservice:AuthService,private  router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authservice.isAuthenticated ==true)
    {
      return true;
    }
    else {
      this.router.navigateByUrl("/login");
      return false;

    }

  }
}
