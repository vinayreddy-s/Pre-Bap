import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routeTransitionAnimations } from 'src/app/routing/route-transition-animation';
import { CandidateDetails, CandidateDetailsService } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-view-candidate-details',
  templateUrl: './view-candidate-details.component.html',
  styleUrls: ['./view-candidate-details.component.scss'],
  animations: [routeTransitionAnimations]
})
export class ViewCandidateDetailsComponent implements OnInit {
  showProgressBar: boolean = true;
  candidateDetails?: CandidateDetails;
  isShorttermIntern: boolean = false;
  isIntern: boolean = false;
  constructor(private router: Router,
    private candidateDetailsService: CandidateDetailsService,
    public loaderService: LoaderService
  ) {

    this.candidateDetails = this.candidateDetailsService.candidateDetails;

    this.candidateDetailsService.candidateDetailsSubject.subscribe(
      candidateDetails => {
        this.candidateDetails = candidateDetails;
      });
  }

  ngOnInit(): void {
    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;
    }
    this.isShorttermIntern = sessionStorage.getItem('category') === 'Short-term Intern' ? true : false;
    this.isIntern = sessionStorage.getItem('category') === 'Intern' ? true : false;
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000';
    }
  }
}
