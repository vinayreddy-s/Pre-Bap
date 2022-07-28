import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EPFNomination, EpfNominationService, EPSFamily } from 'src/app/prodapt-india/services/epf-nomination/epf-nomination.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { NgxSignaturePadComponent, SignaturePadOptions } from '@o.krucheniuk/ngx-signature-pad';

@Component({
  selector: 'app-epsfamily-details',
  templateUrl: './epsfamily-details.component.html',
  styleUrls: ['./epsfamily-details.component.scss']
})
export class EpsfamilyDetailsComponent implements OnInit {
  epsFamilyFormGroup: FormGroup;
  maxEntriesReached: boolean = false;
  dataSource?: EPSFamily[] = [];
  epfNomination?: EPFNomination;
  showProgressBar: boolean = true;
  dob: Date;
  doc?: Date;
  today = new Date();
  epsnomineeSignUrl: any;

  @ViewChild('signPad')
  signaturePadElement?: NgxSignaturePadComponent;

  config: SignaturePadOptions = {
    minWidth: 1,
    maxWidth: 6,
    penColor: "blue"
  };

  constructor(public loaderService: LoaderService,
    private epfNominationService: EpfNominationService) {
    this.epsFamilyFormGroup = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      relationship: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      epsNomineeDate: new FormControl(null)
    });
    this.dob = new Date();
  }

  ngOnInit(): void {
    this.epfNomination = this.epfNominationService.epfNomination;
    if (this.epfNomination?.epsFamilyList != null) {
      this.dataSource = this.epfNomination?.epsFamilyList!;
    }
    if (this.epfNominationService) {
      this.epsFamilyFormGroup.patchValue({
        id: this.epfNomination?.id,
        empId: sessionStorage.getItem('empId'),
        epsNomineeDate: new Date(this.epfNomination?.epsNomineeDate!),
      });
    }
    this.epfNominationService.epfNominationSubject.subscribe(
      epfNomination => {
        this.epfNomination = epfNomination;
        if (epfNomination?.epsFamilyList != null) {
          this.dataSource = epfNomination?.epsFamilyList!;
        }
      });
    if (this.epfNomination?.epsNomineeSign) {
      this.epsnomineeSignUrl = this.epfNomination.epsNomineeSign;
    }
    if (this.epfNomination?.empId !== null) {
      this.showProgressBar = false;
    }
    // if (this.dataSource) {
    //   if (this.dataSource.length >= 4) {
    //     this.maxEntriesReached = true;
    //   } else {
    //     this.maxEntriesReached = false;
    //   }
    // }
  }

  get epsFamilyDataSource(): EPSFamily[] {
    return this.dataSource ?? [];
  }

  get epsFamilyDetailsFormControl() {
    return this.epsFamilyFormGroup.controls;
  }

  public clear() {
    if (this.signaturePadElement) {
      this.signaturePadElement.clear();
    }
  }

  public getImage() {
    if (this.signaturePadElement) {
      this.epsnomineeSignUrl = this.signaturePadElement.toDataURL();
      if (this.epfNomination) {
        this.epfNomination.epsNomineeSign = this.epsnomineeSignUrl;
        this.epfNomination.epsNomineeDate = new Date().getTime();
        this.epfNominationService.updateEPFNominationForm(this.epfNomination!);
      }
      this.signaturePadElement.clear();
    }
  }

  public isInValid(): boolean {
    return !(this.signaturePadElement && !this.signaturePadElement.isEmpty());
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000';
    }
  }

  addLine() {
    let epsFamilyList: EPSFamily = {
      name: this.epsFamilyDetailsFormControl.name.value,
      relationship: this.epsFamilyDetailsFormControl.relationship.value,
      dateOfBirth: new Date(this.epsFamilyDetailsFormControl.dateOfBirth.value).getTime(),
      address: this.epsFamilyDetailsFormControl.address.value
    };

    this.dataSource?.push(epsFamilyList);
    this.epsFamilyFormGroup.reset();

    this.epfNominationService.saveEPSFamily(epsFamilyList);
    // if (this.dataSource) {
    //   if (this.dataSource.length >= 4) {
    //     this.maxEntriesReached = true;
    //   }
    //   else {
    //     this.maxEntriesReached = false;
    //   }
    // }
  }

  removeLine(index: number) {
    if (this.dataSource) {
      this.epfNominationService.deleteEPSFamily(this.dataSource[index].id!);

      this.dataSource.splice(index, 1);
      // if (this.dataSource.length >= 4) {
      //   this.maxEntriesReached = true;
      // } else {
      //   this.maxEntriesReached = false;
      // }
    }
  }

}
