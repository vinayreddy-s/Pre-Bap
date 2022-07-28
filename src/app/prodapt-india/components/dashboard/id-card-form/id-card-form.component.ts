import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routeTransitionAnimations } from 'src/app/routing/route-transition-animation';
import { AuthService } from 'src/app/prodapt-india/services/auth/auth.service';
import { DashboardService } from 'src/app/prodapt-india/services/dashboard/dashboard.service';
import { IdCardFormService } from 'src/app/prodapt-india/services/id-card-form/id-card-form.service';

@Component({
  selector: 'app-id-card-form',
  templateUrl: './id-card-form.component.html',
  styleUrls: ['./id-card-form.component.scss'],
  animations: [routeTransitionAnimations]
})
export class IdCardFormComponent implements OnInit {
  constructor(private router: Router,
    private authService: AuthService,
    private idCardService: IdCardFormService,
    private dashboardService: DashboardService) {
    if (this.authService.isCandidateApproved) {
      this.router.navigateByUrl('/dashboard/viewidcardform')
    }
  }

  ngOnInit(): void {
    this.idCardService.$idSubject.subscribe(
      id => {
        this.dashboardService.calcuclatePercentageProgress();
      }
    )
  }
  navigateToPreview() {
    this.router.navigateByUrl('/dashboard/viewidcardform')
  }
}
