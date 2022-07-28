import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GuardDialogComponent } from 'src/app/prodapt-india/components/dialogs/guard-dialog/guard-dialog.component';
import { CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';

@Injectable({
  providedIn: 'root'
})
export class DeclarationsGuard implements CanActivate {

  constructor(
    private candidateService: CandidateService,
    private matDialog: MatDialog,
    private router: Router) {

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.candidateService.candidate?.declarationsDone) {
        return true;
      } else {
        const dialogRef = this.matDialog.open(GuardDialogComponent, {
          width: '400px',
          data: {
            name: this.candidateService.candidate?.name,
            formName: 'Declarations'
          }
        });

        dialogRef.afterClosed().subscribe(bool => {
          if (bool) {
            this.router.navigateByUrl('/dashboard/codeofconduct');
          }
        });
      }
    return this.candidateService.candidate?.declarationsDone ?? false;
  }
  
}
