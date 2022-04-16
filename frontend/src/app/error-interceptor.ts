import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs/";
import { ErrorComponent } from "./error/error.component";

export class ErrorInterceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler){
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {

          console.log(error);
          alert(error.error.message); //ideally these errors would look nicer with css
          return throwError(error);
        })
      );
  }
}
