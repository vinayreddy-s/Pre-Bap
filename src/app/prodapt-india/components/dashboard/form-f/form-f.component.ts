import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/prodapt-india/services/dashboard/dashboard.service';
import { GratuityFormFService } from 'src/app/prodapt-india/services/gratuity-form-f/gratuity-form-f.service';

@Component({
  selector: 'app-form-f',
  templateUrl: './form-f.component.html',
  styleUrls: ['./form-f.component.scss']
})
export class FormFComponent implements OnInit {

  constructor(private gratuityFormService: GratuityFormFService,
    private router: Router,
    private dashboardService: DashboardService) {

  }

  ngOnInit(): void {
    this.gratuityFormService.formfsubject.subscribe(
      formf => {
        this.dashboardService.calcuclatePercentageProgress();
      }
    )
  }
  navigateToPreview() {
    this.router.navigateByUrl('/dashboard/viewformf')
  }
}
