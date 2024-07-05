import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  formlogin !:FormGroup
  constructor(private fb :FormBuilder,private authservice:AuthService,private router:Router) {
  }
  ngOnInit() {
    this.formlogin=this.fb.group({
      username:this.fb.control(""),
      password:this.fb.control("")
    })

  }

  handleLogin() {
    let username=this.formlogin.value.username;
    let pwd=this.formlogin.value.password;
    this.authservice.login(username,pwd).subscribe(
      data=> {

        this.authservice.loadProfile(data);
        this.router.navigateByUrl("/admin");
      },
      error => {
        console.log(error)
      }
    )
    console.log(this.formlogin.value);
  }
}
