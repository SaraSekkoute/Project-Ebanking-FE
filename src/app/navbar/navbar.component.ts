import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  constructor(public  authservice:AuthService,private router:Router) {
  }

  ngOnInit(): void {

    }
  handleLogout() {
this.authservice.logout();
//this.router.navigateByUrl("/login");
  }
}
