import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EPFKYCDetails, EpfKycFormService } from 'src/app/prodapt-india/services/epf-kyc-form/epf-kyc-form.service';
import { NgxSignaturePadComponent, SignaturePadOptions } from '@o.krucheniuk/ngx-signature-pad';

@Component({
  selector: 'app-undertaking-details',
  templateUrl: './undertaking-details.component.html',
  styleUrls: ['./undertaking-details.component.scss']
})
export class UndertakingDetailsComponent implements OnInit {
  undertakingFormGroup: FormGroup;
  validPassportDates: boolean = false;
  showProgressBar: boolean = true;
  epfKYCDetails?: EPFKYCDetails;
  doc?: Date;
  today = new Date();
  epfSignImageUrl: any

  @ViewChild('signPad')
  signaturePadElement?: NgxSignaturePadComponent;

  config: SignaturePadOptions = {
    minWidth: 1,
    maxWidth: 6,
    penColor: "blue"
  };

  constructor(private epfkycFormService: EpfKycFormService) {
    this.undertakingFormGroup = new FormGroup({
      empId: new FormControl(sessionStorage.getItem('empId')),
      id: new FormControl(),
      placeOfConsent: new FormControl(null),
      dateOfConsent: new FormControl(null),
      epfSignImage: new FormControl(null)
    });
  }

  ngOnInit(): void {

    // Fetch data from Form 11 Details
    this.epfKYCDetails = this.epfkycFormService.epfKYCDetails;
  
    if (this.epfKYCDetails) {
      this.undertakingFormGroup.patchValue({
        id: this.epfKYCDetails?.id,
        empId: sessionStorage.getItem('empId'),
        placeOfConsent: this.epfKYCDetails?.placeOfConsent,
        dateOfConsent: this.epfKYCDetails.dateOfConsent === 0 ? '' : new Date(this.epfKYCDetails.dateOfConsent),
        epfSignImage: this.epfKYCDetails.epfSignImage
      });
    }
    this.epfkycFormService.epfKYCDetailsSubject.subscribe(
      epfKYCDetails => {
        this.epfKYCDetails = epfKYCDetails;
      });
    if (this.epfKYCDetails?.epfSignImage) {
      this.epfSignImageUrl = this.epfKYCDetails.epfSignImage;
    }
    if (this.epfKYCDetails?.empId !== null) {
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
      this.epfSignImageUrl = this.signaturePadElement.toDataURL();
      this.signaturePadElement.clear();
    }
  }

  public isInValid(): boolean {
    return !(this.signaturePadElement && !this.signaturePadElement.isEmpty());
  }

  get formelevenFormControl() {
    return this.undertakingFormGroup.controls;
  }

  saveUndertakingForm() {
    if (!this.undertakingFormGroup.valid) {
      var invalidControls = [];
      const controls = this.undertakingFormGroup.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalidControls.push(name);
        }
      }
    } else {
      if (this.epfKYCDetails) {
        Object.assign(this.epfKYCDetails, this.undertakingFormGroup.value);
        this.epfKYCDetails.epfSignImage = this.epfSignImageUrl;
        this.epfkycFormService.updateepfKYCDetails(this.epfKYCDetails!);
      } else {
        this.epfkycFormService.saveepfKYCDetails(this.undertakingFormGroup.value);
      }
    }
  }

}
