import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/prodapt-india/services/dashboard/dashboard.service';
import { EpfKycFormService } from 'src/app/prodapt-india/services/epf-kyc-form/epf-kyc-form.service';

@Component({
  selector: 'app-form-eleven',
  templateUrl: './form-eleven.component.html',
  styleUrls: ['./form-eleven.component.scss'],
})
export class FormElevenComponent implements OnInit {
  validPassportDates: boolean = false;

  constructor(private epfkycFormService: EpfKycFormService,
    private router: Router,
    private dashboardService: DashboardService) {
  }
  ngOnInit(): void {
    this.epfkycFormService.kycsubject.subscribe(
      kyc => {
        this.dashboardService.calcuclatePercentageProgress();
      }
    )
  }

  navigateToPreview() {
    this.router.navigateByUrl('/dashboard/viewformeleven')
  }

}
