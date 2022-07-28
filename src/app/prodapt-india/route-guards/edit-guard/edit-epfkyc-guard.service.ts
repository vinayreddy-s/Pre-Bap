import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/prodapt-india/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EditEpfkycGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.authService.editEnabled.subscribe(
      bool => {
        if (bool === false) {
          this.router.navigateByUrl('/dashboard/viewformeleven');
        }
      });
    return this.authService.editEnabled;
  }
}
