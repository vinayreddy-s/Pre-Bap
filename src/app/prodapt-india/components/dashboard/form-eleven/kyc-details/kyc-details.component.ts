import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EPFKYCDetails, EpfKycFormService, KYCDetail } from 'src/app/prodapt-india/services/epf-kyc-form/epf-kyc-form.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-kyc-details',
  templateUrl: './kyc-details.component.html',
  styleUrls: ['./kyc-details.component.scss']
})
export class KycDetailsComponent implements OnInit {

  kycdetailsFormGroup: FormGroup;
  validPassportDates: boolean = false;
  maxEntriesReached: boolean = false;
  dataSource?: KYCDetail[] = [];
  epfKYCDetails?: EPFKYCDetails;
  showProgressBar: boolean = true;

  constructor(public loaderService: LoaderService,
    private epfkycFormService: EpfKycFormService) {
    this.kycdetailsFormGroup = new FormGroup({
      id: new FormControl(),
      selectKYC: new FormControl(null, Validators.required),
      nameAsPerDoc: new FormControl(null, Validators.required),
      docNumber: new FormControl(null, Validators.required),
      remarks: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.epfKYCDetails = this.epfkycFormService.epfKYCDetails;
    if (this.epfKYCDetails?.kycDetailList !== null) {
      this.dataSource = this.epfKYCDetails?.kycDetailList!;
    }

    this.epfkycFormService.epfKYCDetailsSubject.subscribe(
      epfKYCDetails => {
        this.epfKYCDetails = epfKYCDetails;
        if (epfKYCDetails?.kycDetailList !== null) {
          this.dataSource = epfKYCDetails?.kycDetailList!;
        }
      });
    if (this.epfKYCDetails?.empId !== null) {
      this.showProgressBar = false;
    }
    // if (this.dataSource) {
    //   if (this.dataSource.length >= 8) {
    //     this.maxEntriesReached = true;
    //   } else {
    //     this.maxEntriesReached = false;
    //   }
    // }
  }

  get kycDataSource(): KYCDetail[] {
    return this.dataSource ?? [];
  }

  get kycDetailsFormControl() {
    return this.kycdetailsFormGroup.controls;
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000';
    }
  }

  addLine() {
    let kycDetails: KYCDetail = {
      selectKYC: this.kycDetailsFormControl.selectKYC.value,
      nameAsPerDoc: this.kycDetailsFormControl.nameAsPerDoc.value,
      docNumber: this.kycDetailsFormControl.docNumber.value,
      remarks: this.kycDetailsFormControl.remarks.value
    };

    this.dataSource?.push(kycDetails);
    this.epfkycFormService.savekycDetail(kycDetails);
    this.kycdetailsFormGroup.reset();

    // if (this.dataSource) {
    //   if (this.dataSource.length >= 8) {
    //     this.maxEntriesReached = true;
    //   } else {
    //     this.maxEntriesReached = false;
    //   }
    // }
  }

  removeLine(index: number) {
    if (this.dataSource) {
      this.epfkycFormService.deletekycDetail(this.dataSource[index].id!);

      this.dataSource.splice(index, 1);
      // if (this.dataSource.length >= 8) {
      //   this.maxEntriesReached = true;
      // } else {
      //   this.maxEntriesReached = false;
      // }
    }
  }

}
