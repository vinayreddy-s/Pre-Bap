import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { WelfareFund, WelfareFundService } from 'src/app/prodapt-india/services/welfare-fund/welfare-fund.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-view-welfare-fund',
  templateUrl: './view-welfare-fund.component.html',
  styleUrls: ['./view-welfare-fund.component.scss']
})
export class ViewWelfareFundComponent implements OnInit {
  showProgressBar: boolean = true;
  welfareFundDetails?: WelfareFund;
  imageUrl?: any;

  constructor(private router: Router,
    private candidateService: CandidateService,
    private welfareFundService: WelfareFundService,
    public loaderService: LoaderService) {
    this.welfareFundDetails = this.welfareFundService.welfareFund;
    this.welfareFundService.welfareFundsubject.subscribe(
      welfareFundDetails => {
        this.welfareFundDetails = welfareFundDetails;
      });
    if (this.welfareFundDetails?.signImage != null) {
      this.imageUrl = this.welfareFundDetails.signImage;
    }
  }

  ngOnInit(): void {
    if (this.welfareFundDetails?.empId !== null) {
      this.showProgressBar = false;
    }
  }

  navigateToEditWelfareForm() {
    this.router.navigateByUrl('/dashboard/welfaredetails')
  }
}
