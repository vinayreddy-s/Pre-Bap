import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';

@Injectable({
  providedIn: 'root'
})
export class ConsentGuard implements CanActivate {

  constructor(private candidateService: CandidateService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve => {
      this.candidateService.getCandidate(sessionStorage.getItem('empId') ?? '');
      this.candidateService.subject.subscribe(
        candidate => {
          resolve(candidate.consentFormAccepted!);  
        }
      );
    })
    // this.candidateService.candidate?.consentFormAccepted!;
  }

}
