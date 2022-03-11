import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AddInfoService } from "./add-info.service";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private addInfoService: AddInfoService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>{
    const isAuth = this.addInfoService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/Waitless'])
    }
     return isAuth;
  }

}
