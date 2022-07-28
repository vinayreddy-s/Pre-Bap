import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateDetails, CandidateDetailsService } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { Candidate, CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { DashboardService } from 'src/app/prodapt-india/services/dashboard/dashboard.service';
import { WelfareFund, WelfareFundService } from 'src/app/prodapt-india/services/welfare-fund/welfare-fund.service';
import { routeTransitionAnimations } from 'src/app/routing/route-transition-animation';
import { NgxSignaturePadComponent, SignaturePadOptions } from "@o.krucheniuk/ngx-signature-pad";

@Component({
  selector: 'app-welfare-fund',
  templateUrl: './welfare-fund.component.html',
  styleUrls: ['./welfare-fund.component.scss'],
  animations: [routeTransitionAnimations]
})
export class WelfareFundComponent implements OnInit {
  showProgressBar: boolean = true;
  welfareFundFormGroup: FormGroup;
  welfareFundDetails?: WelfareFund;
  candidateDetails?: CandidateDetails;
  candidate?: Candidate;
  fund_nil: boolean = false;
  fund_100: boolean = false;
  fund_300: boolean = false;
  fund_500: boolean = false;
  fund_free: boolean = false;
  empdoj?: Date;
  welfareAmount: any;
  imageUrl?: any;

  @ViewChild('signPad')
  signaturePadElement?: NgxSignaturePadComponent;

  config: SignaturePadOptions = {
    minWidth: 1,
    maxWidth: 6,
    penColor: "blue"
  };

  constructor(private welfareFundService: WelfareFundService,
    private router: Router,
    private candidateService: CandidateService,
    private candidateDetailsService: CandidateDetailsService,
    private dashboardService: DashboardService) {
    this.welfareFundFormGroup = new FormGroup({
      id: new FormControl(),
      empId: new FormControl(sessionStorage.getItem('empId')),
      empName: new FormControl(null, Validators.required),
      empCode: new FormControl(null),
      welfareFundAmount: new FormControl(null, Validators.required),
      dateOfJoining: new FormControl(null),
      freeText: new FormControl(null),
      signImage: new FormControl(null),
      signDate: new FormControl(null),
    });
  }

  ngOnInit(): void {
    //Fetch data from Candidate
    this.candidate = this.candidateService.candidate;
    if (this.candidate) {
      this.welfareFundFormGroup.patchValue({
        id: this.candidate?.id,
        empId: sessionStorage.getItem('empId'),
        dateOfJoining: new Date(this.candidate?.dateOfJoining!)
      });
    }
    if (this.candidate?.id !== null) {
      this.showProgressBar = false;
    }

    // Fetch data from Company App Form
    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    if (this.candidateDetails) {
      this.welfareFundFormGroup.patchValue({
        id: this.candidateDetails?.id,
        empId: sessionStorage.getItem('empId'),
        empName: this.candidateDetails?.firstName + ' ' + this.candidateDetails?.lastName,
      });
    }
    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;
    }

    // Fetch data from Welfare Fund Details
    this.welfareFundDetails = this.welfareFundService.welfareFund;
    if (this.welfareFundDetails?.signImage != null) {
      this.imageUrl = this.welfareFundDetails.signImage;
    }
    if (this.welfareFundDetails) {
      this.welfareFundFormGroup.patchValue({
        id: this.welfareFundDetails.id,
        empId: sessionStorage.getItem('empId'),
        empName: this.welfareFundDetails.empName,
        empCode: this.welfareFundDetails.empCode,
        dateOfJoining: this.welfareFundDetails.dateOfJoining
      });
    }
    this.welfareFundService.$welfareDetails.subscribe(
      welfareFundDetails => {
        this.welfareFundDetails = welfareFundDetails;
        if (this.welfareFundDetails?.signImage != null) {
          this.imageUrl = this.welfareFundDetails.signImage;
        }
      });

    if (this.welfareFundDetails?.empId !== null) {
      this.showProgressBar = false;
    }
    this.welfareFundService.welfareFundsubject.subscribe(
      welfareFund => {
        this.dashboardService.calcuclatePercentageProgress();
      }
    )

    // if (this.welfareFundDetails) {
    //   if (this.welfareFundDetails.welfareFundAmount === 'nil') {
    //     this.fund_nil = true;
    //     this.welfareFundFormGroup.patchValue({
    //       welfareFundAmount: this.welfareFundDetails.welfareFundAmount
    //     });
    //   } else if (this.welfareFundDetails.welfareFundAmount === '100') {
    //     this.fund_100 = true;
    //     this.welfareFundFormGroup.patchValue({
    //       welfareFundAmount: this.welfareFundDetails.welfareFundAmount
    //     });
    //   } else if (this.welfareFundDetails.welfareFundAmount === '300') {
    //     this.fund_300 = true;
    //     this.welfareFundFormGroup.patchValue({
    //       welfareFundAmount: this.welfareFundDetails.welfareFundAmount
    //     });
    //   } else if (this.welfareFundDetails.welfareFundAmount === '500') {
    //     this.fund_500 = true;
    //     this.welfareFundFormGroup.patchValue({
    //       welfareFundAmount: this.welfareFundDetails.welfareFundAmount
    //     });
    //   } else {
    //     this.fund_free = true;
    //     this.fund_free = true; this.welfareFundFormGroup.patchValue({
    //       freeText: this.welfareFundDetails.welfareFundAmount,
    //       //welfareFundAmount: this.welfareFundDetails.welfareFundAmount
    //     });
    //   }

    //   if ((this.welfareFundDetails.welfareFundAmount === 'nil') || (this.welfareFundDetails.welfareFundAmount === '100')
    //     || (this.welfareFundDetails.welfareFundAmount === '300') || (this.welfareFundDetails.welfareFundAmount === '500')) {
    //     this.fund_free = false;
    //   }
    // }
  }

  get welfareFundFormControl() {
    return this.welfareFundFormGroup.controls;
  }

  public clear() {
    if (this.signaturePadElement) {
      this.signaturePadElement.clear();
    }
  }

  public getImage() {
    if (this.signaturePadElement) {
      this.imageUrl = this.signaturePadElement.toDataURL();
    }
  }

  saveWelfareFundDetails() {
    if (this.fund_nil) {
      this.welfareAmount = "nil";
    } else if (this.fund_100) {
      this.welfareAmount = "100";
    } else if (this.fund_300) {
      this.welfareAmount = "300";
    } else if (this.fund_500) {
      this.welfareAmount = "500";
    } else if (this.fund_free) {
      this.welfareAmount = this.welfareFundFormControl.freeText.value;
    } else {
      this.welfareAmount = 0;
    }

    let welfareFundDetails: WelfareFund = {
      id: this.welfareFundDetails?.id,
      empId: this.welfareFundFormControl.empId.value,
      empName: this.welfareFundFormControl.empName.value,
      dateOfJoining: this.candidate?.dateOfJoining!,
      empCode: this.welfareFundFormControl.empCode.value,
      welfareFundAmount: this.welfareAmount,
      signImage: this.imageUrl,
      signDate: new Date().getTime()
    };

    if (!this.welfareFundFormGroup.valid) {
      var invalidControls = [];
      const controls = this.welfareFundFormGroup.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalidControls.push(name);
        }
      }
    } else {
      if (this.welfareFundDetails) {
        Object.assign(this.welfareFundDetails, welfareFundDetails);
        this.welfareFundService.updateWelfareFundDetails(this.welfareFundDetails!);
      } else {
        this.welfareFundService.saveWelfareFundDetails(welfareFundDetails);
      }
    }
    if (this.signaturePadElement) {
      this.signaturePadElement.clear();
    }
  }

  public isInValid(): boolean {
    return !(this.signaturePadElement && !this.signaturePadElement.isEmpty());
  }

  navigateToPreview() {
    this.router.navigateByUrl('/dashboard/viewwelfaredetails')
  }

}
