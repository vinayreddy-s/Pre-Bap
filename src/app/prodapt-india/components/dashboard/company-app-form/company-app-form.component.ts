import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateDetailsService } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { DashboardService } from 'src/app/prodapt-india/services/dashboard/dashboard.service';

@Component({
  selector: 'app-company-app-form',
  templateUrl: './company-app-form.component.html',
  styleUrls: ['./company-app-form.component.scss']
})
export class CompanyAppFormComponent implements OnInit {
  constructor(
    private router: Router,
    private candidateDetailsService: CandidateDetailsService,
    private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.candidateDetailsService.cdSubject.subscribe(
      candidateDetails => {
        this.dashboardService.calcuclatePercentageProgress();
      }
    )
  }

  navigateToPreview() {
    this.router.navigateByUrl('/dashboard/viewcompanyappform')
  }
}
