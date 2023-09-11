import {  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable} from '@angular/core'
import { AuthService } from "./auth.service";

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private authservice: AuthService, private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ):  Observable<boolean>|Promise<boolean>|boolean {
            const isAuth = this.authservice.getIsAuth();
            if(!isAuth){
                this.router.navigate(['/auth/login']);

            }
        return isAuth;
        }
}