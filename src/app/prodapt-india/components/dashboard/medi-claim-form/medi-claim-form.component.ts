import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/prodapt-india/services/dashboard/dashboard.service';
import { MediclaimFormService } from 'src/app/prodapt-india/services/medi-claim-form/medi-claim-form.service';

@Component({
  selector: 'app-medi-claim-form',
  templateUrl: './medi-claim-form.component.html',
  styleUrls: ['./medi-claim-form.component.scss']
})
export class MediClaimFormComponent implements OnInit {
  constructor(private mediclaimService: MediclaimFormService,
    private router: Router,
    private dashboardService: DashboardService) {

  }

  ngOnInit(): void {
    this.mediclaimService.mediclaimSubject.subscribe(
      medi => {
        this.dashboardService.calcuclatePercentageProgress();
      }
    )
  }

  navigateToPreview() {
    this.router.navigateByUrl('/dashboard/viewmediclaimform')
  }

}
