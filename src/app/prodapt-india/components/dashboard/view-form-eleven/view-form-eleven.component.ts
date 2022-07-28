import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EPFKYCDetails, EpfKycFormService } from 'src/app/prodapt-india/services/epf-kyc-form/epf-kyc-form.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-view-form-eleven',
  templateUrl: './view-form-eleven.component.html',
  styleUrls: ['./view-form-eleven.component.scss']
})
export class ViewFormElevenComponent implements OnInit {
  showProgressBar: boolean = true;
  epfKYCDetails?: EPFKYCDetails;
  epfSignImageUrl: any;

  constructor(private router: Router,
    private epfkycFormService: EpfKycFormService,
    public loaderService: LoaderService) {
    this.epfKYCDetails = this.epfkycFormService.epfKYCDetails;
    this.epfkycFormService.epfKYCDetailsSubject.subscribe(
      epfKYCDetails => {
        this.epfKYCDetails = epfKYCDetails;
      });
    if (this.epfKYCDetails?.epfSignImage) {
      this.epfSignImageUrl = this.epfKYCDetails.epfSignImage;
    }
  }

  ngOnInit(): void {
    if (this.epfKYCDetails?.empId !== null) {
      this.showProgressBar = false;
    }
  }

  navigateToEditFormEleven() {
    this.router.navigateByUrl('/dashboard/formeleven')
  }
}
