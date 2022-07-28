import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidateDetails, CandidateDetailsService } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { Candidate, CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { EPFKYCDetails, EpfKycFormService } from 'src/app/prodapt-india/services/epf-kyc-form/epf-kyc-form.service';

@Component({
  selector: 'app-declaration-form',
  templateUrl: './declaration-form.component.html',
  styleUrls: ['./declaration-form.component.scss']
})
export class DeclarationFormComponent implements OnInit {
  declarationFormGroup: FormGroup;
  validPassportDates: boolean = false;
  isEmpProvidentFundChecked: boolean = false;
  isEmpPensionFundChecked: boolean = false;
  showProgressBar: boolean = true;
  epfKYCDetails?: EPFKYCDetails;
  candidateDetails?: CandidateDetails;
  candidate?: Candidate;
  today = new Date();
  dob?: Date;
  doj?: Date
  doe?: Date;
  dojPrev?: Date;
  validFrom?: Date;
  validTo?: Date;
  epfEnrolledDate?: Date;
  empdob?: Date;
  empdoj?: Date;

  constructor(private candidateDetailsService: CandidateDetailsService,
    private epfkycFormService: EpfKycFormService,
    private candidateService: CandidateService) {
    this.declarationFormGroup = new FormGroup({
      empId: new FormControl(sessionStorage.getItem('empId')),
      id: new FormControl(),
      // Step 1
      name: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      dateOfBirth: new FormControl(null, Validators.required),
      dateOfJoining: new FormControl(null, Validators.required),
      fatherOrSpouseName: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      relationship: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.compose([Validators.pattern('[1-9][0-9]{9}'), Validators.required])),
      email: new FormControl(null, Validators.compose([Validators.email, Validators.required])),
      memberOfEPF: new FormControl(null, Validators.required),
      memberOfEPS: new FormControl(null, Validators.required),
      // Step 2
      uan: new FormControl({ value: '', disabled: true }, Validators.compose([Validators.pattern('[0-9]{12}')])),
      regionCode: new FormControl({ value: '', disabled: true }),
      officeCode: new FormControl({ value: '', disabled: true }),
      establishmentId: new FormControl({ value: '', disabled: true }),
      extension: new FormControl({ value: '', disabled: true }),
      accountNumber: new FormControl({ value: '', disabled: true }),
      dateOfExit: new FormControl({ value: '', disabled: true }),
      dateOfJoiningPrev: new FormControl({ value: '', disabled: true }),
      schemeCertificateNumber: new FormControl({ value: '', disabled: true }),
      ppoNumber: new FormControl({ value: '', disabled: true }),
      // Step 3
      isInternationWorker: new FormControl(null, Validators.required),
      countryOforigin: new FormControl(null),
      passportNumber: new FormControl(null),
      validFrom: new FormControl(null),
      validTo: new FormControl(null),
      eduQualifications: new FormControl(null, Validators.required),
      maritialStatus: new FormControl(null, Validators.required),
      speciallyabled: new FormControl('No', Validators.required),
      disabledCategory: new FormControl(null),
      // Step 4
      epfEnrolledDate: new FormControl(null),
      epfWages: new FormControl(null),
      epfMember: new FormControl(null),
      epfWithdrawn: new FormControl(null),
      epsWithdrawn: new FormControl(null),
      epsEarned: new FormControl(null)
    });
  }

  get declarationFormControl() {
    return this.declarationFormGroup.controls;
  }

  ngOnInit(): void {

    this.declarationFormControl.memberOfEPF.valueChanges.subscribe((value) => {
      if (value === 'Yes') {
        this.declarationFormControl.uan.enable();
        this.declarationFormControl.regionCode.enable();
        this.declarationFormControl.officeCode.enable();
        this.declarationFormControl.establishmentId.enable();
        this.declarationFormControl.extension.enable();
        this.declarationFormControl.accountNumber.enable();
        this.declarationFormControl.dateOfExit.enable();
        this.declarationFormControl.dateOfJoiningPrev.enable();
        this.declarationFormControl.schemeCertificateNumber.enable();
        this.declarationFormControl.ppoNumber.enable();
        this.declarationFormControl.epfEnrolledDate.setValidators([Validators.required]);
        this.declarationFormControl.epfWages.setValidators([Validators.required]);
        this.declarationFormControl.epfMember.setValidators([Validators.required]);
      } else {
        this.declarationFormControl.uan.reset();
        this.declarationFormControl.regionCode.reset();
        this.declarationFormControl.officeCode.reset();
        this.declarationFormControl.establishmentId.reset();
        this.declarationFormControl.extension.reset();
        this.declarationFormControl.accountNumber.enable();
        this.declarationFormControl.dateOfExit.enable();
        this.declarationFormControl.dateOfJoiningPrev.enable();
        this.declarationFormControl.schemeCertificateNumber.enable();
        this.declarationFormControl.ppoNumber.enable();
        this.declarationFormControl.epfEnrolledDate.setValidators([]);
        this.declarationFormControl.epfWages.setValidators([]);
        this.declarationFormControl.epfMember.setValidators([]);
        this.declarationFormControl.epfEnrolledDate.reset();
        this.declarationFormControl.epfWages.reset();
        this.declarationFormControl.epfMember.reset();
      }
    });

    this.declarationFormControl.memberOfEPS.valueChanges.subscribe((value) => {
      if (value === 'Yes') {
        this.declarationFormControl.uan.enable();
        this.declarationFormControl.regionCode.enable();
        this.declarationFormControl.officeCode.enable();
        this.declarationFormControl.establishmentId.enable();
        this.declarationFormControl.extension.enable();
        this.declarationFormControl.accountNumber.enable();
        this.declarationFormControl.dateOfExit.enable();
        this.declarationFormControl.dateOfJoiningPrev.enable();
        this.declarationFormControl.schemeCertificateNumber.enable();
        this.declarationFormControl.ppoNumber.enable();
      } else {
        this.declarationFormControl.uan.reset();
        this.declarationFormControl.regionCode.reset();
        this.declarationFormControl.officeCode.reset();
        this.declarationFormControl.establishmentId.reset();
        this.declarationFormControl.extension.reset();
        this.declarationFormControl.accountNumber.enable();
        this.declarationFormControl.dateOfExit.enable();
        this.declarationFormControl.dateOfJoiningPrev.enable();
        this.declarationFormControl.schemeCertificateNumber.enable();
        this.declarationFormControl.ppoNumber.enable();
      }
    });

    this.declarationFormControl.uan.valueChanges.subscribe((value) => {
      if (value === '') {
        this.declarationFormControl.regionCode.enable();
        this.declarationFormControl.officeCode.enable();
        this.declarationFormControl.establishmentId.enable();
        this.declarationFormControl.extension.enable();
      } else {
        this.declarationFormControl.regionCode.disable();
        this.declarationFormControl.officeCode.disable();
        this.declarationFormControl.establishmentId.disable();
        this.declarationFormControl.extension.disable();
      }
    });

    this.declarationFormControl.speciallyabled.valueChanges.subscribe((value) => {
      if (value === 'Yes') {
        this.declarationFormControl.disabledCategory.setValidators([Validators.required]);
      } else {
        this.declarationFormControl.disabledCategory.setValidators([]);
        this.declarationFormControl.disabledCategory.reset();
      }
    });

    this.declarationFormControl.epfMember.valueChanges.subscribe((value) => {
      if (value === 'Yes') {
        this.declarationFormControl.epfWithdrawn.setValidators([Validators.required]);
        this.declarationFormControl.epsWithdrawn.setValidators([Validators.required]);
      } else {
        this.declarationFormControl.epfWithdrawn.setValidators([]);
        this.declarationFormControl.epsWithdrawn.setValidators([]);
        this.declarationFormControl.epfWithdrawn.reset();
        this.declarationFormControl.epsWithdrawn.reset();
      }
    });

    //Fetch data from Candidate
    this.candidate = this.candidateService.candidate;
    if (this.candidate) {
      this.declarationFormGroup.patchValue({
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
      this.declarationFormGroup.patchValue({
        id: this.candidateDetails?.id,
        empId: sessionStorage.getItem('empId'),
        name: this.candidateDetails?.firstName + ' ' + this.candidateDetails?.lastName,
        dateOfBirth: new Date(this.candidateDetails?.dateOfBirth!),
        gender: this.candidateDetails?.gender,
        fatherOrSpouseName: this.candidateDetails?.fatherOrSpouseName,
        mobile: this.candidateDetails?.mobileNumber,
        email: this.candidateDetails?.email,
        maritialStatus: this.candidateDetails?.maritalStatus,
        uan: this.candidateDetails?.uan
      });
    }
    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;
    }

    // Fetch data from Form 11 Details
    this.epfKYCDetails = this.epfkycFormService.epfKYCDetails;
    if (this.epfKYCDetails) {
      this.declarationFormGroup.patchValue({
        empId: this.epfKYCDetails.empId,
        id: this.epfKYCDetails.id,
        name: this.epfKYCDetails.name,
        mobile: this.epfKYCDetails.mobile,
        dateOfBirth: new Date(this.epfKYCDetails.dateOfBirth),
        dateOfJoining: this.epfKYCDetails.dateOfJoining,
        email: this.epfKYCDetails.email,
        gender: this.epfKYCDetails.gender,
        fatherOrSpouseName: this.epfKYCDetails.fatherOrSpouseName,
        relationship: this.epfKYCDetails.relationship,
        memberOfEPF: this.epfKYCDetails.memberOfEPF,
        memberOfEPS: this.epfKYCDetails.memberOfEPS,

        uan: this.epfKYCDetails.uan,
        regionCode: this.epfKYCDetails.regionCode,
        officeCode: this.epfKYCDetails.officeCode,
        establishmentId: this.epfKYCDetails.establishmentId,
        extension: this.epfKYCDetails.extension,
        accountNumber: this.epfKYCDetails.accountNumber,
        dateOfExit: this.epfKYCDetails.dateOfExit === 0 ? '' : new Date(this.epfKYCDetails.dateOfExit),
        dateOfJoiningPrev: this.epfKYCDetails.dateOfJoiningPrev === 0 ? '' : new Date(this.epfKYCDetails.dateOfJoiningPrev),
        schemeCertificateNumber: this.epfKYCDetails.schemeCertificateNumber,
        ppoNumber: this.epfKYCDetails.ppoNumber,

        isInternationWorker: this.epfKYCDetails.isInternationWorker,
        countryOforigin: this.epfKYCDetails.countryOforigin,
        passportNumber: this.epfKYCDetails.passportNumber,
        validFrom: this.epfKYCDetails.validTo === 0 ? '' : new Date(this.epfKYCDetails.validTo),
        validTo: this.epfKYCDetails.validFrom === 0 ? '' : new Date(this.epfKYCDetails.validFrom),
        eduQualifications: this.epfKYCDetails.eduQualifications,
        maritialStatus: this.epfKYCDetails.maritialStatus,
        speciallyabled: this.epfKYCDetails.speciallyabled,
        disabledCategory: this.epfKYCDetails.disabledCategory,

        epfEnrolledDate: this.epfKYCDetails.epfEnrolledDate === 0 ? '' : new Date(this.epfKYCDetails.epfEnrolledDate),
        epfWages: this.epfKYCDetails.epfWages,
        epfMember: this.epfKYCDetails.epfMember,
        epfWithdrawn: this.epfKYCDetails.epfWithdrawn,
        epsWithdrawn: this.epfKYCDetails.epsWithdrawn,
        epsEarned: this.epfKYCDetails.epsEarned,
      });
    }
    this.epfkycFormService.epfKYCDetailsSubject.subscribe(
      epfKYCDetails => {
        this.epfKYCDetails = epfKYCDetails;
      });
    if (this.epfKYCDetails?.empId != null) {
      this.showProgressBar = false;
    }
  }


  saveDeclarationForm() {
    if (!this.declarationFormGroup.valid) {
      var invalidControls = [];
      const controls = this.declarationFormGroup.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalidControls.push(name);
        }
      }
    } else {
      if (this.epfKYCDetails) {
        Object.assign(this.epfKYCDetails, this.declarationFormGroup.value);
        this.epfkycFormService.updateepfKYCDetails(this.epfKYCDetails!);
      } else {
        this.epfkycFormService.saveepfKYCDetails(this.declarationFormGroup.value);
      }
    }
  }
}
