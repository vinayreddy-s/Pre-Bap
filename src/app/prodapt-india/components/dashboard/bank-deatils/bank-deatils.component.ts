import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routeTransitionAnimations } from 'src/app/routing/route-transition-animation';
import { BankDetails, BankDetailsService } from 'src/app/prodapt-india/services/bank-details/bank-details.service';
import { CandidateDetails, CandidateDetailsService } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { Candidate, CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { DashboardService } from 'src/app/prodapt-india/services/dashboard/dashboard.service';
import { LocalMessage, MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-bank-deatils',
  templateUrl: './bank-deatils.component.html',
  styleUrls: ['./bank-deatils.component.scss'],
  animations: [routeTransitionAnimations]
})
export class BankDeatilsComponent implements OnInit {
  showProgressBar: boolean = true;
  bankFormGroup: FormGroup;
  bankDetails?: BankDetails;
  candidateDetails?: CandidateDetails;
  candidate?: Candidate;
  empdoj?: Date;
  doj?: Date;

  imageUrl: any;
  pdfUrl: any;
  fileUrl: any;
  fileName: any;
  fileType: any;

  constructor(private bankDetailsService: BankDetailsService,
    private messagingService: MessagingService,
    private router: Router,
    private candidateDetailsService: CandidateDetailsService,
    private dashboardService: DashboardService,
    private candidateService: CandidateService) {
    this.bankFormGroup = new FormGroup({
      empId: new FormControl(sessionStorage.getItem('empId')),
      id: new FormControl(),
      empName: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      empCode: new FormControl(null),
      bankName: new FormControl(null, Validators.required),
      branchName: new FormControl(null, Validators.required),
      accountNumber: new FormControl(null, Validators.required),
      ifscCode: new FormControl(null, Validators.required),
      docType: new FormControl(null, Validators.required),
      docImageUrl: new FormControl(null),
      dateOfJoining: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    //Fetch data from Candidate
    this.candidate = this.candidateService.candidate;
    if (this.candidate) {
      this.bankFormGroup.patchValue({
        id: this.candidate?.id,
        empId: sessionStorage.getItem('empId'),
        dateOfJoining: this.candidate?.dateOfJoining!
      });
    }
    if (this.candidate?.id !== null) {
      this.showProgressBar = false;
    }

    // Fetch data from Company App Form
    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    if (this.candidateDetails) {
      this.bankFormGroup.patchValue({
        id: this.candidateDetails?.id,
        empId: sessionStorage.getItem('empId'),
        empName: this.candidateDetails?.firstName + ' ' + this.candidateDetails?.lastName
      });
    }
    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;
    }

    // Fetch data from Bank Details
    this.bankDetails = this.bankDetailsService.bankDetails;
    if (this.bankDetails) {
      this.bankFormGroup.patchValue({
        id: this.bankDetails.id,
        empId: sessionStorage.getItem('empId'),
        empName: this.bankDetails.empName,
        empCode: this.bankDetails.empCode,
        dateOfJoining: this.bankDetails.dateOfJoining,
        bankName: this.bankDetails.bankName,
        branchName: this.bankDetails.branchName,
        accountNumber: this.bankDetails.accountNumber,
        ifscCode: this.bankDetails.ifscCode,
        docType: this.bankDetails.docType,
        docImageUrl: this.bankDetails.docImageUrl,
      });
    }
    this.bankDetailsService.bankDetailsSubject.subscribe(
      bankDetails => {
        this.bankDetails = bankDetails;
      });
    if (this.bankDetails?.docImageUrl != null) {
      this.fileType = this.bankDetails.urlType;
      if (this.fileType === 'application/pdf') {
        this.pdfUrl = this.bankDetails.docImageUrl;
      }
      if (this.fileType === 'image/jpeg' || this.fileType === 'image/png' || this.fileType === 'image/x-eps') {
        this.imageUrl = this.bankDetails.docImageUrl;
      }
    }
    if (this.bankDetails?.empId !== null) {
      this.showProgressBar = false;
    }
    this.bankDetailsService.banksubject.subscribe(
      bank => {
        this.dashboardService.calcuclatePercentageProgress();
      }
    )
  }

  get bankDetailsFormControl() {
    return this.bankFormGroup.controls;
  }

  onImageSelected(event: any) {
    if (event.target.files[0].size < 2097152) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        let file = event.target.files[0];
        this.fileName = file.name;
        this.fileType = file.type;
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          this.fileUrl = event.target?.result;
          if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/x-eps') {
            this.imageUrl = event.target?.result;
            this.pdfUrl = null;
            this.messagingService.reportMessage(new LocalMessage('Image ' + file.name + ' is selected', false));
          } else if (file.type === "application/pdf") {
            this.pdfUrl = event.target?.result;
            this.imageUrl = null;
            this.messagingService.reportMessage(new LocalMessage('PDF ' + file.name + ' is selected', false));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Wrong File Selection, Please Select JPEG, PNG Images or PDF Files', true));
          }
        }
      }
    } else {
      this.messagingService.reportMessage(new LocalMessage('File size should be less then 2 MB', true));
    }
  }

  saveBankDetails() {

    if (this.fileType === 'application/pdf') {
      this.fileUrl = this.pdfUrl;
    } else {
      this.fileUrl = this.imageUrl;
    }

    this.bankFormGroup.patchValue({
      docImageUrl: this.fileUrl
    });

    let bankDetails: BankDetails = {
      id: this.bankDetails?.id,
      empId: this.bankDetailsFormControl.empId.value,
      empName: this.bankDetailsFormControl.empName.value,
      dateOfJoining: this.bankDetailsFormControl.dateOfJoining.value,
      empCode: this.bankDetailsFormControl.empCode.value,
      bankName: this.bankDetailsFormControl.bankName.value,
      branchName: this.bankDetailsFormControl.branchName.value,
      accountNumber: this.bankDetailsFormControl.accountNumber.value,
      ifscCode: this.bankDetailsFormControl.ifscCode.value,
      docType: this.bankDetailsFormControl.docType.value,
      docImageUrl: this.fileUrl,
      urlType: this.fileType
    };

    if (!this.bankFormGroup.valid) {
      var invalidControls = [];
      const controls = this.bankFormGroup.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalidControls.push(name);
        }
      }
    } else {
      if (this.bankDetails) {
        Object.assign(this.bankDetails, bankDetails);
        this.bankDetailsService.updatebankDetails(this.bankDetails!);
      } else {
        this.bankDetailsService.savebankDetails(bankDetails);
      }
    }
  }

  navigateToPreview() {
    this.router.navigateByUrl('/dashboard/viewbankdetails')
  }
}
