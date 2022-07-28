import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateDetailsService } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';

@Component({
  selector: 'app-view-company-app-form',
  templateUrl: './view-company-app-form.component.html',
  styleUrls: ['./view-company-app-form.component.scss']
})
export class ViewCompanyAppFormComponent implements OnInit {

  constructor(private router: Router, private candidateDetailsService: CandidateDetailsService) {
  }

  ngOnInit(): void {
  }

  navigateToEditCompanyAppForm() {
    this.router.navigateByUrl('/dashboard/companyappform')
  }
}
