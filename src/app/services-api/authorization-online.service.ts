import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

/**
 * Service for authorizations linked to the connections of the user
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorizationOnlineService implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  /**
   * Verifications for the routing (connection / disconnection)
   * @param route: route to analyze
   * @param state: the url from which the snapshot was created
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authenticationService.isLogin()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
