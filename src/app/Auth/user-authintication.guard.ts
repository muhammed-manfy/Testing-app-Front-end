import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
@Injectable()
export class userAuthinticationGuard implements CanActivate {

    constructor(private _router:Router ) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
      var token = localStorage.getItem("token");
        //check some condition
        if (!token)  {
            this._router.navigate(['/login']);
            return false;
        }
        return true;
    }

}















// userAuthinticationGuard
