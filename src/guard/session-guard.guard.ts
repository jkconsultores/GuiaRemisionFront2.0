import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceServiceService } from 'src/services/auth-service-service.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuardGuard  {
  constructor(private auth: AuthServiceServiceService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.auth.isLogin()) {
        return this.router.navigate(['login']).then(() => false);
      }
      return true;
  }

}
