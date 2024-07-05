import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AccountDetails} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient) { }

  public getAccount(accountId :string ,page : number,size :number):Observable<AccountDetails>
  {
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);

  }
  public  debit(accoountId :string ,amount :number,description :string)
  {
    let data= {accountId :accoountId,amount:amount,description:description}
     return this.http.post(environment.backendHost+"/accounts/debit",data);

  }
  public  credit(Id :string ,amount :number,description :string)
  {
    let data= {accountId :Id,amount:amount,description:description}
    return this.http.post(environment.backendHost+"/accounts/credit",data);

  }

  public  transfer(accountSource :string ,accountDestination :string ,amount :number)
  {
    //the same let data= {accountId :Id,amount:amount,description:description}
    let data= {accountSource,accountDestination,amount}
    return this.http.post(environment.backendHost+"/accounts/transfer",data);

  }


  // public searchAccounts(keyword :string):Observable<Array<Account>>
  // {
  //   return this.http.get<Array<Account>>(environment.backendHost+"/accounts/search?keyword="+keyword);
  //
  // }
  //
  // public saveAccounts(account:Account):Observable<Account>
  // {
  //   return this.http.post<Account>(environment.backendHost+"/accounts",account);
  //
  // }
  //
  // public deleteAccounts(id :number)
  // {
  //   return this.http.delete(environment.backendHost+"/account/"+id);
  //
  // }

}
