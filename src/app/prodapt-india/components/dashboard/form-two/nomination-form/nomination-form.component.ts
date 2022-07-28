import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address, CandidateDetails, CandidateDetailsService } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { Candidate, CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { EPFNomination, EpfNominationService } from 'src/app/prodapt-india/services/epf-nomination/epf-nomination.service';

@Component({
  selector: 'app-nomination-form',
  templateUrl: './nomination-form.component.html',
  styleUrls: ['./nomination-form.component.scss']
})

export class NominationFormComponent implements OnInit {
  nominationFormGroup: FormGroup;
  showProgressBar: boolean = true;
  candidateDetails?: CandidateDetails;
  epfNomination?: EPFNomination;
  candidate?: Candidate;
  empdob?: Date;
  empdoj?: Date;
  dob?: Date;
  doj?: Date;
  today = new Date();
  dataSource: Address[] = [];
  permanenetaddress: string = '';
  presentaddress: string = '';

  constructor(private candidateDetailsService: CandidateDetailsService,
    private epfNominationService: EpfNominationService,
    private candidateService: CandidateService) {
    this.nominationFormGroup = new FormGroup({
      empId: new FormControl(sessionStorage.getItem('empId')),
      id: new FormControl(),
      empName: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      gender: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      maritialStatus: new FormControl(null, Validators.required),
      empFatherOrSpouseName: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      accountNumber: new FormControl(null),
      dateOfJoining: new FormControl(null, Validators.required),
      presentAddress: new FormControl(null, Validators.required),
      permanentAddress: new FormControl(null, Validators.required)
    });
  }

  get nominationFormControl() {
    return this.nominationFormGroup.controls;
  }

  ngOnInit(): void {

    //Fetch data from Candidate
    this.candidate = this.candidateService.candidate;
    if (this.candidate) {
      this.nominationFormGroup.patchValue({
        id: this.candidate?.id,
        empId: sessionStorage.getItem('empId'),
        dateOfJoining: this.candidate?.dateOfJoining!
      });
    }
    if (this.candidate?.id !== null) {
      this.showProgressBar = false;
    }

    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    if (this.candidateDetails?.addressList !== null) {
      this.dataSource = this.candidateDetails?.addressList!;
      let permanent = this.dataSource?.filter(address => address.type === 'Permanent Address')[0];
      let present = this.dataSource?.filter(address => address.type === 'Communication Address')[0];
      if (permanent) {
        this.permanenetaddress = permanent.addressLine1 + ', ' + permanent.addressLine2
          + ', ' + permanent.city + ', ' + permanent.state + ', ' + permanent.zipOrPostalCode + ', ' + permanent.country;
      }
      if (present) {
        this.presentaddress = present.addressLine1 + ', ' + present.addressLine2
          + ', ' + present.city + ', ' + present.state + ', ' + present.zipOrPostalCode + ', ' + present.country;
      }
    }
    // Fetch data from Company App Form
    if (this.candidateDetails) {
      this.nominationFormGroup.patchValue({
        id: this.candidateDetails?.id,
        empId: sessionStorage.getItem('empId'),
        empName: this.candidateDetails?.firstName + ' ' + this.candidateDetails?.lastName,
        dateOfBirth: new Date(this.candidateDetails?.dateOfBirth!),
        maritialStatus: this.candidateDetails?.maritalStatus,
        empFatherOrSpouseName: this.candidateDetails?.fatherOrSpouseName,
        presentAddress: this.presentaddress,
        permanentAddress: this.permanenetaddress
      });
    }
    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;
    }

    this.epfNomination = this.epfNominationService.epfNomination;
    if (this.epfNomination) {
      this.nominationFormGroup.patchValue({
        empId: this.epfNomination.empId,
        id: this.epfNomination.id,
        empName: this.epfNomination.empName,
        gender: this.epfNomination.gender,
        dateOfBirth: new Date(this.epfNomination?.dateOfBirth!),
        dateOfJoining: this.epfNomination?.dateOfJoining!,
        maritialStatus: this.epfNomination.maritialStatus,
        empFatherOrSpouseName: this.epfNomination.empFatherOrSpouseName,
        accountNumber: this.epfNomination.accountNumber,
        presentAddress: this.epfNomination.presentAddress,
        permanentAddress: this.epfNomination.permanentAddress
      });
    }

    this.epfNominationService.epfNominationSubject.subscribe(
      epfNomination => {
        this.epfNomination = epfNomination;
      });
    if (this.epfNomination?.empId !== null) {
      this.showProgressBar = false;
    }
  }

  get addressDataSource(): Address[] {
    return this.dataSource;
  }

  saveEPFNominationForm() {
    if (!this.nominationFormGroup.valid) {
      var invalidControls = [];
      const controls = this.nominationFormGroup.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalidControls.push(name);
        }
      }
    } else {
      if (this.epfNomination) {
        Object.assign(this.epfNomination, this.nominationFormGroup.value);
        this.epfNominationService.updateEPFNominationForm(this.epfNomination!);
      } else {
        this.epfNominationService.saveEPFNominationForm(this.nominationFormGroup.value);
      }
    }
  }

}
