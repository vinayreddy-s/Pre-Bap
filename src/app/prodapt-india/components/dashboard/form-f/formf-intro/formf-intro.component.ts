import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { routeTransitionAnimations } from 'src/app/routing/route-transition-animation';
import { Address, CandidateDetails, CandidateDetailsService } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { Gratuity, GratuityFormFService } from 'src/app/prodapt-india/services/gratuity-form-f/gratuity-form-f.service';
import { NgxSignaturePadComponent, SignaturePadOptions } from '@o.krucheniuk/ngx-signature-pad';

@Component({
  selector: 'app-formf-intro',
  templateUrl: './formf-intro.component.html',
  styleUrls: ['./formf-intro.component.scss'],
  animations: [routeTransitionAnimations]
})
export class FormfIntroComponent implements OnInit {
  gratuityFormGroup: FormGroup;
  showProgressBar: boolean = true;
  gratuity?: Gratuity;
  candidateDetails?: CandidateDetails;
  empDateOn?: Date;
  empDateApp?: Date;
  dataSource: Address[] = [];
  permanenetaddress: string = '';
  today = new Date();
  formfSignImageUrl: any;

  @ViewChild('signPad')
  signaturePadElement?: NgxSignaturePadComponent;

  config: SignaturePadOptions = {
    minWidth: 1,
    maxWidth: 6,
    penColor: "blue"
  };

  constructor(private candidateDetailsService: CandidateDetailsService,
    private gratuityFormService: GratuityFormFService) {
    this.gratuityFormGroup = new FormGroup({
      empId: new FormControl(sessionStorage.getItem('empId')),
      id: new FormControl(),
      //Step 1
      companyAddress: new FormControl('Prodapt Solutions Pvt. Ltd., 4th Floor, Prince Infocity-II, Kanthanchavadi, Chennai - 96, India.'),
      empName: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      // Step 2
      gender: new FormControl(null, Validators.required),
      religion: new FormControl(null, Validators.required),
      maritialStatus: new FormControl(null, Validators.required),
      empDept: new FormControl(),
      dateOfAppointment: new FormControl(),
      empTicketOrSerialNo: new FormControl(),
      // Step 3
      empAddress: new FormControl(null, Validators.required),
      empVillage: new FormControl(),
      empThana: new FormControl(),
      empSubDivision: new FormControl(),
      empPostOffice: new FormControl(null),
      empState: new FormControl(null, Validators.required),
      empDistrict: new FormControl(null, Validators.required),
      placeOn: new FormControl(),
      dateOn: new FormControl()
    });
  }

  ngOnInit(): void {

    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    if (this.candidateDetails?.addressList !== null) {
      this.dataSource = this.candidateDetails?.addressList!;
      let permanentAddress = this.dataSource?.filter(address => address.type === 'Permanent Address')[0];
      if (permanentAddress) {
        this.permanenetaddress = permanentAddress.addressLine1 + ', ' + permanentAddress.addressLine2
          + ', ' + permanentAddress.city + ', ' + permanentAddress.state + ', ' + permanentAddress.zipOrPostalCode + ', ' + permanentAddress.country;
      }
    }
    // Fetch data from Company App Form
    if (this.candidateDetails) {
      this.gratuityFormGroup.patchValue({
        id: this.candidateDetails?.id,
        empId: sessionStorage.getItem('empId'),
        empName: this.candidateDetails?.firstName + ' ' + this.candidateDetails?.lastName,
        gender: this.candidateDetails?.gender,
        // religion: this.candidateDetails?.religion,
        maritialStatus: this.candidateDetails?.maritalStatus,
        empAddress: this.permanenetaddress
      });
    }
    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;
    }

    // Fetching from Form F Details
    this.gratuity = this.gratuityFormService.gratuity;
   
    if (this.gratuity) {
      this.gratuityFormGroup.patchValue({
        id: this.gratuity?.id,
        empId: sessionStorage.getItem('empId'),
        empName: this.gratuity?.empName,
        companyAddress: this.gratuity?.companyAddress,

        gender: this.gratuity?.gender,
        religion: this.gratuity?.religion,
        maritialStatus: this.gratuity?.maritialStatus,
        empDept: this.gratuity?.empDept,
        dateOfAppointment: this.gratuity.dateOfAppointment === 0 ? '' : new Date(this.gratuity.dateOfAppointment),
        empTicketOrSerialNo: this.gratuity?.empTicketOrSerialNo,

        empAddress: this.gratuity?.empAddress,
        empVillage: this.gratuity?.empVillage,
        empThana: this.gratuity?.empThana,
        empSubDivision: this.gratuity?.empSubDivision,
        empPostOffice: this.gratuity?.empPostOffice,
        empState: this.gratuity?.empState,
        empDistrict: this.gratuity?.empDistrict,
        dateOn: this.gratuity.dateOn === 0 ? '' : new Date(this.gratuity.dateOn),
        placeOn: this.gratuity?.placeOn,
        formfSignImage: this.gratuity?.formfSignImage
      });
    }

    this.gratuityFormService.gratuitySubject.subscribe(
      gratuity => {
        this.gratuity = gratuity;
      });
    if (this.gratuity?.formfSignImage) {
      this.formfSignImageUrl = this.gratuity.formfSignImage;
    }
    if (this.gratuity?.empId !== null) {
      this.showProgressBar = false;
    }
  }

  public clear() {
    if (this.signaturePadElement) {
      this.signaturePadElement.clear();
    }
  }

  public getImage() {
    if (this.signaturePadElement) {
      this.formfSignImageUrl = this.signaturePadElement.toDataURL();
      this.signaturePadElement.clear();
    }
  }

  public isInValid(): boolean {
    return !(this.signaturePadElement && !this.signaturePadElement.isEmpty());
  }

  get gratuityFormDetailsFormControl() {
    return this.gratuityFormGroup.controls;
  }

  saveGratuityForm() {
    if (!this.gratuityFormGroup.valid) {
      var invalidControls = [];
      const controls = this.gratuityFormGroup.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalidControls.push(name);
        }
      }
    } else {
      if (this.gratuity) {
        this.gratuity.formfSignImage = this.formfSignImageUrl;
        Object.assign(this.gratuity, this.gratuityFormGroup.value);
        this.gratuityFormService.updateGratuityForm(this.gratuity!);
      } else {
        this.gratuityFormService.saveGratuityForm(this.gratuityFormGroup.value);
      }
    }
  }

}
