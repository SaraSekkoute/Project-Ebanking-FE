import {Component, OnInit} from '@angular/core';
import {CustomersService} from "../services/customers.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})

export class CustomersComponent implements OnInit{
   customers! :Observable<Array<Customer>>;
   errorMessage! : string;
   searchformGroup : FormGroup | undefined;
  constructor(private customersService:CustomersService,private fb:FormBuilder ,private router:Router,public authservice:AuthService) {}
  ngOnInit(): void {
    this.searchformGroup=this.fb.group(
      {
        //stocke automatiquement
        keyword:this.fb.control("")
      }
    )
// instead of subscrbe... =>en htm async et pipi catch error ..
//     this.customers=this.customersService.getCustomers().pipe(
//       catchError(err =>{
//         this.errorMessage=err.message;
//         return throwError(err)
//       }
//   )
//     );
    this.handleSearchCustomer();
  }

  handleSearchCustomer() {
   let kw=this.searchformGroup?.value.keyword;
    this.customers=this.customersService.searchCustomers(kw).pipe(
      catchError(err =>{
          this.errorMessage=err.message;
          return throwError(err)
        }
      ));
  }

  handleDeleteCustomer(c:Customer) {
 let conf =confirm("Are you Sue?");
 if(!conf) return;
    this.customersService.deleteCustomers(c.id).
    subscribe(
      data => {
      this.customers=this.customers.pipe(
        map( data=>{
         let index =data.indexOf(c);
         data.slice(index,1)
          return data
          }

        )
      )
        alert("Customer has been successfully  deleted ");
      },
      error => {
        console.log(error)
      })
  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl("/customer-accounts/"+customer.id,{state:customer})

  }
}
