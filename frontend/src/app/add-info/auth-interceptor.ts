import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AddInfoService } from "./add-info.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private addInfoService: AddInfoService){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    const authToken = this.addInfoService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
