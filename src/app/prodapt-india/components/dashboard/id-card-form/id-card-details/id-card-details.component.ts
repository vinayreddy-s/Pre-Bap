import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';
import { routeTransitionAnimations } from 'src/app/routing/route-transition-animation';
import { Address, CandidateDetails, CandidateDetailsService } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { IdCard, IdCardFormService } from 'src/app/prodapt-india/services/id-card-form/id-card-form.service';
import { LocalMessage, MessagingService } from 'src/app/services/messaging/messaging.service';
import { NgxSignaturePadComponent, SignaturePadOptions } from '@o.krucheniuk/ngx-signature-pad';
import { Document } from 'src/app/prodapt-india/services/declarations/declarations.service';

@Component({
  selector: 'app-id-card-details',
  templateUrl: './id-card-details.component.html',
  styleUrls: ['./id-card-details.component.scss'],
  animations: [routeTransitionAnimations]
})
export class IdCardDetailsComponent implements OnInit {
  showProgressBar: boolean = true;
  idcardFormGroup: FormGroup;
  idCard?: IdCard;
  candidateDetails?: CandidateDetails;
  dataSource: Address[] = [];
  ppImageUrl: any;
  signImageUrl: any;
  permanenetaddress: string = '';
  imgResultBeforeCompress?: string;
  imgResultAfterCompress?: string;

  @ViewChild('signPad')
  signaturePadElement?: NgxSignaturePadComponent;

  config: SignaturePadOptions = {
    minWidth: 1,
    maxWidth: 6,
    penColor: "blue"
  };

  constructor(private candidateDetailsService: CandidateDetailsService,
    private idCardFormService: IdCardFormService,
    private messagingService: MessagingService,
    private candidateService: CandidateService,
    private imageCompress: NgxImageCompressService) {
    this.idcardFormGroup = new FormGroup({
      empId: new FormControl(sessionStorage.getItem('empId')),
      id: new FormControl(),
      empName: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      empCode: new FormControl(null),
      mobile: new FormControl(null, Validators.compose([Validators.minLength(10), Validators.pattern('[1-9][0-9]{9}'), Validators.required])),
      photoImage: new FormControl(null),
      signImage: new FormControl(null),
      bloodGroup: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required)
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
      this.idcardFormGroup.patchValue({
        id: this.candidateDetails?.id,
        empId: sessionStorage.getItem('empId'),
        empName: this.candidateDetails?.firstName + ' ' + this.candidateDetails?.lastName,
        mobile: this.candidateDetails?.emgContactMobile,
        // bloodGroup: this.candidateDetails?.bloodGroup,
        address: this.permanenetaddress
      });
    }
    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;
    }

    // Fetching from IdCard Details
    this.idCard = this.idCardFormService.idCard;
    if (this.idCard) {
      this.idcardFormGroup.patchValue({
        id: this.idCard?.id,
        empId: sessionStorage.getItem('empId'),
        empName: this.idCard?.empName,
        empCode: this.idCard?.empCode,
        mobile: this.idCard?.mobile,
        photoImage: this.idCard?.photoImage,
        signImage: this.idCard?.signImage,
        bloodGroup: this.idCard?.bloodGroup,
        address: this.idCard?.address,
      });
    }

    this.idCardFormService.$idCardSubject.subscribe(
      idCard => {
        this.idCard = idCard;
      });
    if (this.idCard?.photoImage) {
      this.ppImageUrl = this.idCard.photoImage;
    }
    if (this.idCard?.signImage) {
      this.signImageUrl = this.idCard.signImage;
    }
    if (this.idCard?.empId !== null) {
      this.showProgressBar = false;
    }
  }

  onPpImageSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      let file = event.target.files[0];

      reader.readAsDataURL(file);
      reader.onload = (event) => {
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/x-eps') {
          this.ppImageUrl = event.target?.result;
          this.messagingService.reportMessage(new LocalMessage('Image ' + file.name + ' is selected', false));
        } else {
          this.messagingService.reportMessage(new LocalMessage('Wrong File Selection, Please Select JPEG, PNG Images or PDF Files', true));
        }
      }
    }
  }

  onSignImageSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      let file = event.target.files[0];

      reader.readAsDataURL(file);
      reader.onload = (event) => {
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/x-eps') {
          this.signImageUrl = event.target?.result;
          this.messagingService.reportMessage(new LocalMessage('Image ' + file.name + ' is selected', false));
        } else {
          this.messagingService.reportMessage(new LocalMessage('Wrong File Selection, Please Select JPEG, PNG Images or PDF Files', true));
        }
      }
    }
  }

  public clear() {
    if (this.signaturePadElement) {
      this.signaturePadElement.clear();
    }
  }

  public getImage() {
    if (this.signaturePadElement) {
      this.signImageUrl = this.signaturePadElement.toDataURL();
      this.signaturePadElement.clear();
    }
  }

  public isInValid(): boolean {
    return !(this.signaturePadElement && !this.signaturePadElement.isEmpty());
  }

  get idcardDetailsFormControl() {
    return this.idcardFormGroup.controls;
  }

  saveIdCardDetailsForm() {
    if (!this.idcardFormGroup.valid) {
      var invalidControls = [];
      const controls = this.idcardFormGroup.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalidControls.push(name);
        }
      }
    } else {
      let idCard: IdCard = {
        id: this.idCard?.id,
        empName: this.idcardDetailsFormControl.empName.value,
        empId: this.idcardDetailsFormControl.empId.value,
        empCode: this.idcardDetailsFormControl.empCode.value,
        address: this.idcardDetailsFormControl.address.value,
        bloodGroup: this.idcardDetailsFormControl.bloodGroup.value,
        mobile: this.idcardDetailsFormControl.mobile.value,
        photoImage: this.ppImageUrl,
        signImage: this.signImageUrl
      };

      if (this.idCard) {
        Object.assign(this.idCard, idCard);
        this.idCardFormService.updateIdCard(this.idCard!);
      } else {
        this.idCardFormService.saveIdCard(idCard);
      }

      let imgResultAfterCompress: string;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(idCard.photoImage));
      this.imageCompress.compressFile(idCard.photoImage, -1, 25, 25).then(
        result => {
          imgResultAfterCompress = result;
          if (this.candidateService.candidate) {
            this.candidateService.candidate.photoImage = imgResultAfterCompress;
            this.candidateService.updateCandidate(this.candidateService.candidate)
            console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          }
        }
      );
    }
  }

}
