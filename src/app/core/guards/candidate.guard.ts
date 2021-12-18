import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../modules/authentication/services/token-storage-service.service';

@Injectable({
  providedIn: 'root',
})
export class CandidateGuard implements CanActivate {
  constructor(
    private tokenservice: TokenStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!!this.tokenservice.getToken()) {
      // logged in so return true
      this.tokenservice.getUser().role &&
        this.tokenservice.getUser().role === 'ROLE_CANDIDATE';
    }

    // not logged in so redirect to login page with the return url
    return this.router.navigate(['/auth']);
  }
}
