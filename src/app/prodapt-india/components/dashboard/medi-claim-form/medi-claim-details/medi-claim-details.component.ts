import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidateDetails, CandidateDetailsService } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { Candidate, CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { Mediclaim, MediclaimFormService } from 'src/app/prodapt-india/services/medi-claim-form/medi-claim-form.service';

@Component({
  selector: 'app-medi-claim-details',
  templateUrl: './medi-claim-details.component.html',
  styleUrls: ['./medi-claim-details.component.scss']
})
export class MediClaimDetailsComponent implements OnInit {
  showProgressBar: boolean = true;
  mediclaim?: Mediclaim;
  candidateDetails?: CandidateDetails;
  candidate?: Candidate;
  mediclaimFormGroup: FormGroup;
  empdob?: Date;
  empdoj?: Date;
  dob?: Date;
  doj?: Date;
  today = new Date();

  constructor(private candidateDetailsService: CandidateDetailsService,
    private mediclaimService: MediclaimFormService,
    private candidateService: CandidateService) {
    this.mediclaimFormGroup = new FormGroup({
      empId: new FormControl(sessionStorage.getItem('empId')),
      id: new FormControl(),
      name: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      gender: new FormControl(null, Validators.required),
      dateOfJoining: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      covidVaccination: new FormControl(null, Validators.required),
      empCode: new FormControl(null)
    });
  }

  get mediclaimFormControl() {
    return this.mediclaimFormGroup.controls;
  }

  ngOnInit(): void {
    //Fetch data from Candidate
    this.candidate = this.candidateService.candidate;
    if (this.candidate) {
      this.mediclaimFormGroup.patchValue({
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
      this.mediclaimFormGroup.patchValue({
        id: this.candidateDetails?.id,
        empId: sessionStorage.getItem('empId'),
        name: this.candidateDetails?.firstName + ' ' + this.candidateDetails?.lastName,
        dateOfBirth: new Date(this.candidateDetails?.dateOfBirth!),
      });
    }
    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;
    }

    // Fetch data from Mediclaim Details
    this.mediclaim = this.mediclaimService.mediclaim;
    if (this.mediclaim) {
      this.mediclaimFormGroup.patchValue({
        empId: sessionStorage.getItem('empId'),
        id: this.mediclaim?.id,
        name: this.mediclaim?.name,
        gender: this.mediclaim?.gender,
        dateOfBirth: new Date(this.mediclaim.dateOfBirth),
        dateOfJoining: this.mediclaim.dateOfJoining,
        covidVaccination: this.mediclaim?.covidVaccination,
        empCode: this.mediclaim?.empCode
      });
    }

    this.mediclaimService.mediclaimSubject.subscribe(
      mediclaim => {
        this.mediclaim = mediclaim;
      });
    if (this.mediclaim?.empId !== null) {
      this.showProgressBar = false;
    }
  }


  saveMediClaimDetailsForm() {
    if (!this.mediclaimFormGroup.valid) {
      var invalidControls = [];
      const controls = this.mediclaimFormGroup.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalidControls.push(name);
        }
      }
    } else {
      if (this.mediclaim) {
        Object.assign(this.mediclaim, this.mediclaimFormGroup.value);
        this.mediclaimService.updateMediclaimInfo(this.mediclaim!);
      } else {
        this.mediclaimService.saveMediclaimInfo(this.mediclaimFormGroup.value);
      }
    }
  }
}
