import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomersService} from "../services/customers.service";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {Router, Routes} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements  OnInit{
  newCustomerFormGroup ! :FormGroup;

  constructor(private customersService:CustomersService,private fb:FormBuilder ,private router:Router) {}
  ngOnInit() {
    //FormBuilder simplifies tasks like adding validation rules and handling form submissions
    this.newCustomerFormGroup=this.fb.group({
      name:this.fb.control(null,[Validators.required,Validators.minLength(4)]),
     email:this.fb.control(null,[Validators.required,Validators.email]),
    })
  }

  handleSaveCustomer() {
    let customers :Customer=this.newCustomerFormGroup.value;
    this.customersService.saveCustomers(customers).subscribe(
      data =>{
        alert("Customer has been successfully  saved ")
        //pour vider les champs
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl("/customers");
    },
      error => {
        console.log(error)
      }    )


  }
}
