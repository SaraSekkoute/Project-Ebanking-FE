import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
@Injectable({
  providedIn: 'root'
})

export class AuthorizationGuard {


constructor(private authservice:AuthService,private  router:Router) {}

canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  console.log(this.authservice.roles);
  console.log(this.authservice.username);
  if (this.authservice.roles.includes(route.data['requiredRoles']) )
  {
    return true;
  }
  else {
    this.router.navigateByUrl("/admin/notAuthorized");
    return false;

  }

}
}
