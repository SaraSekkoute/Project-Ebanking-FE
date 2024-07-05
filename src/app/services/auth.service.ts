import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated :boolean =false;
  roles :any;
  username :any;
  accessToken ! :any; // It is filled after authentication (function load)
  constructor(private http:HttpClient,private router:Router) { }
  // faire ce post {/}POST http://localhost:8085/auth/login
  //   Content-Type: application/x-www-form-urlencoded
  //
  // username=user1&password=12345}
  public login(username:string,password:string)
  {
    let options={
      headers :new  HttpHeaders().set("Content-Type","application/x-www-form-urlencoded" )
    }
    let params =new HttpParams().set("username",username).set("password",password)

    return this.http.post("http://localhost:8085/auth/login",params,options);

  }

  loadProfile(data: any) {
    this.isAuthenticated=true;
    this.accessToken = data['access-token'];

    let jwtDecoder:any = jwtDecode(this.accessToken);
    //recuperer les roles
    this.username=jwtDecoder.sub;
    this.roles=jwtDecoder.scope;
//stocker jwt-token
    window.localStorage.setItem("jwt-token",this.accessToken)
  }



  logout() {
    //the best way to do it is appstate
    this.isAuthenticated=false;
    this.accessToken=undefined;
    this.username=undefined;
    this.roles=undefined;
    window.localStorage.removeItem("jwt-token");
    this.router.navigateByUrl("/login");
  }


  loadJwtTokenFromLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      let token = window.localStorage.getItem("jwt-token");
      if (token) {
        this.loadProfile({ "access-token": token });
        this.router.navigateByUrl("/admin/customers");
      }
    }


  }
}
