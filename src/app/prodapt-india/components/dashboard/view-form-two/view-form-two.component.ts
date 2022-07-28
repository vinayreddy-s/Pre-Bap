import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EPFNomination, EpfNominationService } from 'src/app/prodapt-india/services/epf-nomination/epf-nomination.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-view-form-two',
  templateUrl: './view-form-two.component.html',
  styleUrls: ['./view-form-two.component.scss']
})
export class ViewFormTwoComponent implements OnInit {
  showProgressBar: boolean = true;
  epfNomination?: EPFNomination;
  epfnomineeSignUrl: any;
  epsnomineeSignUrl: any;
  constructor(private router: Router,
    private epfNominationService: EpfNominationService,
    public loaderService: LoaderService) {
    this.epfNomination = this.epfNominationService.epfNomination;
    this.epfNominationService.epfNominationSubject.subscribe(
      epfNomination => {
        this.epfNomination = epfNomination;
      });
    if (this.epfNomination?.epfNomineeSign) {
      this.epfnomineeSignUrl = this.epfNomination.epfNomineeSign;
    }
    if (this.epfNomination?.epsNomineeSign) {
      this.epsnomineeSignUrl = this.epfNomination.epsNomineeSign;
    }
  }

  ngOnInit(): void {
    if (this.epfNomination?.empId !== null) {
      this.showProgressBar = false;
    }
  }
  navigateToEditFormTwo() {
    this.router.navigateByUrl('/dashboard/formtwo')
  }
}
