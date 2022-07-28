import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { routeTransitionAnimations } from 'src/app/routing/route-transition-animation';
import { CandidateDetails, CandidateDetailsService } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { Candidate, CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss'],
  animations: [routeTransitionAnimations]
})
export class CandidateDetailsComponent implements OnInit {
  candidateDetailsFormGroup: FormGroup;
  showProgressBar: boolean = true;
  candidateDetails?: CandidateDetails;
  candidate?: Candidate;
  empdob?: Date;
  empdoj?: Date;
  on_Boarded: boolean = false;
  today = new Date();

  isShorttermIntern: boolean = false;
  isIntern: boolean = false;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  constructor(private candidateDetailsService: CandidateDetailsService,
    private candidateService: CandidateService) {
    this.candidateDetailsFormGroup = new FormGroup({
      // Step 1
      id: new FormControl(),
      empId: new FormControl(sessionStorage.getItem('empId')),
      firstName: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      lastName: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      dateOfBirth: new FormControl(null, Validators.required),
      maritalStatus: new FormControl(null, Validators.required),
      mobileNumber: new FormControl(null, Validators.compose([Validators.minLength(10), Validators.pattern('[1-9][0-9]{9}'), Validators.required])),
      email: new FormControl(),
      // Step 2
      gender: new FormControl(null, Validators.required),
      bloodGroup: new FormControl(null, Validators.required),
      nationality: new FormControl(null, Validators.required),
      fatherOrSpouseName: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      uan: new FormControl(null),
      // Step 3
      emgContactName: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      emgContactRelation: new FormControl(null, Validators.required),
      emgContactMobile: new FormControl(null, Validators.compose([Validators.minLength(10), Validators.pattern('[1-9][0-9]{9}'), Validators.required])),
      emgContactEmail: new FormControl(null, Validators.compose([Validators.email, Validators.pattern('[a-zA-Z0-9.]*@[a-zA-Z0-9.]*.[a-zA-Z0-9.]*'), Validators.required])),
      // Step 4
      socialMediLink: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    // Fetch data from Candidate
    this.candidate = this.candidateService.candidate;
    this.candidateService.candidateSubject.subscribe(
      candidate => {
        this.candidate = candidate;
      }
    );
    if (this.candidate) {
      this.candidateDetailsFormGroup.patchValue({
        empId: sessionStorage.getItem('empId'),
        email: this.candidate?.email,
        dateOfJoining: this.candidate?.dateOfJoining!
      });
    }
    if (this.candidate?.id !== null) {
      this.showProgressBar = false;
    }

    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    this.candidateDetailsService.candidateDetailsSubject.subscribe(
      candidateDetails => {
        this.candidateDetails = candidateDetails;
      }
    );

    this.candidateDetailsFormGroup.patchValue({
      // Step 1
      id: this.candidateDetails?.id,
      empId: sessionStorage.getItem('empId'),
      firstName: this.candidateDetails?.firstName,
      lastName: this.candidateDetails?.lastName,
      dateOfBirth: new Date(this.candidateDetails?.dateOfBirth!),
      maritalStatus: this.candidateDetails?.maritalStatus,
      mobileNumber: this.candidateDetails?.mobileNumber,
      email: this.candidateDetails?.email,
      // Step 2
      gender: this.candidateDetails?.gender,
      bloodGroup: this.candidateDetails?.bloodGroup,
      nationality: this.candidateDetails?.nationality,
      fatherOrSpouseName: this.candidateDetails?.fatherOrSpouseName,
      uan: this.candidateDetails?.uan,
      // Step 3
      emgContactName: this.candidateDetails?.emgContactName,
      emgContactRelation: this.candidateDetails?.emgContactRelation,
      emgContactEmail: this.candidateDetails?.emgContactEmail,
      emgContactMobile: this.candidateDetails?.emgContactMobile,
      // Step 4
      socialMediLink: this.candidateDetails?.socialMediLink
    });

    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;
    }

    this.isShorttermIntern = sessionStorage.getItem('category') === 'Short-term Intern' ? true : false;
    this.isIntern = sessionStorage.getItem('category') === 'Intern' ? true : false;
   
  }

  get candidateDetailsFormControl() {
    return this.candidateDetailsFormGroup.controls;
  }

  saveCandidateDetailsForm() {
    if (!this.candidateDetailsFormGroup.valid) {
      var invalidControls = [];
      const controls = this.candidateDetailsFormGroup.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalidControls.push(name);
        }
      }
    } else {

      let candDetails: CandidateDetails = {
        id: this.candidateDetails?.id,
        empId: this.candidate?.id!,
        firstName: this.candidateDetailsFormControl.firstName.value,
        lastName: this.candidateDetailsFormControl.lastName.value,
        dateOfBirth: new Date(this.candidateDetailsFormControl.dateOfBirth.value).getTime(),
        maritalStatus: this.candidateDetailsFormControl.maritalStatus.value,
        mobileNumber: this.candidateDetailsFormControl.mobileNumber.value,
        email: this.candidate?.email!,
        gender: this.candidateDetailsFormControl.gender.value,
        uan: this.candidateDetailsFormControl.uan.value,
        bloodGroup: this.candidateDetailsFormControl.bloodGroup.value,
        nationality: this.candidateDetailsFormControl.nationality.value,
        dateOfJoining: this.candidate?.dateOfJoining!,
        fatherOrSpouseName: this.candidateDetailsFormControl.fatherOrSpouseName.value,
        emgContactName: this.candidateDetailsFormControl.emgContactName.value,
        emgContactRelation: this.candidateDetailsFormControl.emgContactRelation.value,
        emgContactEmail: this.candidateDetailsFormControl.emgContactEmail.value,
        emgContactMobile: this.candidateDetailsFormControl.emgContactMobile.value,
        socialMediLink: this.candidateDetailsFormControl.socialMediLink.value,

        modifiedBy: this.candidate?.email
      }

      if (this.candidateDetails?.id) {
        Object.assign(this.candidateDetails, candDetails);
        this.candidateDetailsService.updateCandidateDetails(this.candidateDetails!);
      } else {
        this.candidateDetailsService.saveCandidateDetails(candDetails);
      }
    }
  }

}
