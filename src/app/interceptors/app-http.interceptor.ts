import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';

import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
console.log(request.url);
if(!request.url.includes("/auth/login"))
{
  let newRequest =request.clone(
    {
      headers:request.headers.set('Authorization','Bearer '+this.authService.accessToken)
    }
  );
  //console.log("test"+this.authService.accessToken);
  return next.handle(newRequest).pipe(

    catchError(

      err=> {
        if (err.stat == 401)
          this.authService.logout();
        throw throwError(err.messages);
      }


    )
  );

}
else
{
  return next.handle(request);
}




  }
}

