import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/prodapt-india/services/dashboard/dashboard.service';
import { EpfNominationService } from 'src/app/prodapt-india/services/epf-nomination/epf-nomination.service';

@Component({
  selector: 'app-form-two',
  templateUrl: './form-two.component.html',
  styleUrls: ['./form-two.component.scss']
})
export class FormTwoComponent implements OnInit {

  constructor(private epfNominationService: EpfNominationService,
    private router: Router,
    private dashboardService: DashboardService) {

  }

  ngOnInit(): void {
    this.epfNominationService.nominationsubject.subscribe(
      epf => {
        this.dashboardService.calcuclatePercentageProgress();
      }
    )
  }

  navigateToPreview() {
    this.router.navigateByUrl('/dashboard/viewformtwo')
  }

}
