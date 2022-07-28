import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EPFNomination, EpfNominationService, EPFNominee } from 'src/app/prodapt-india/services/epf-nomination/epf-nomination.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalMessage, MessagingService } from 'src/app/services/messaging/messaging.service';
import { NgxSignaturePadComponent, SignaturePadOptions } from '@o.krucheniuk/ngx-signature-pad';

@Component({
  selector: 'app-epfnominee-details',
  templateUrl: './epfnominee-details.component.html',
  styleUrls: ['./epfnominee-details.component.scss']
})
export class EpfnomineeDetailsComponent implements OnInit {
  epfNomineeFormGroup: FormGroup;
  maxEntriesReached: boolean = false;
  dataSource?: EPFNominee[] = [];
  epfNomination?: EPFNomination;
  showProgressBar: boolean = true;
  dob: Date;
  today = new Date();
  epfnomineeSignUrl: any;

  @ViewChild('signPad')
  signaturePadElement?: NgxSignaturePadComponent;

  config: SignaturePadOptions = {
    minWidth: 1,
    maxWidth: 6,
    penColor: "blue"
  };

  constructor(public loaderService: LoaderService,
    private epfNominationService: EpfNominationService,
    private messagingService: MessagingService,) {
    this.epfNomineeFormGroup = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      relationship: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      proportion: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      minorDetails: new FormControl(null)
    });
    this.dob = new Date();
  }

  ngOnInit(): void {
    this.epfNomination = this.epfNominationService.epfNomination;
    if (this.epfNomination?.epfNomineeList !== null) {
      this.dataSource = this.epfNomination?.epfNomineeList!;
    }
    this.epfNominationService.epfNominationSubject.subscribe(
      epfNomination => {
        this.epfNomination = epfNomination;
        if (epfNomination?.epfNomineeList !== null) {
          this.dataSource = epfNomination?.epfNomineeList!;
        }
      });
    if (this.epfNomination?.epfNomineeSign) {
      this.epfnomineeSignUrl = this.epfNomination.epfNomineeSign;
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

  get epfNomineeDataSource(): EPFNominee[] {
    return this.dataSource ?? [];
  }

  get epfNomineeFormControl() {
    return this.epfNomineeFormGroup.controls;
  }

  public clear() {
    if (this.signaturePadElement) {
      this.signaturePadElement.clear();
    }
  }

  public getImage() {
    if (this.signaturePadElement) {
      this.epfnomineeSignUrl = this.signaturePadElement.toDataURL();
      if (this.epfNomination) {
        this.epfNomination.epfNomineeSign = this.epfnomineeSignUrl;
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
    let epfNomineeList: EPFNominee = {
      name: this.epfNomineeFormControl.name.value,
      relationship: this.epfNomineeFormControl.relationship.value,
      dateOfBirth: new Date(this.epfNomineeFormControl.dateOfBirth.value).getTime(),
      address: this.epfNomineeFormControl.address.value,
      proportion: this.epfNomineeFormControl.proportion.value,
      minorDetails: this.epfNomineeFormControl.minorDetails.value,
    };

    var totalProportion: number = 0;
    this.dataSource?.forEach(nDetails => {
      totalProportion += nDetails.proportion!;
    });

    if ((totalProportion + epfNomineeList.proportion!) <= 100) {
      this.dataSource?.push(epfNomineeList);
      this.epfNomineeFormGroup.reset();
      this.epfNominationService.saveEPFNominee(epfNomineeList);
    } else {
      this.messagingService.reportMessage(new LocalMessage
        ('Total Share has exceeded 100%, Pls limit to the cumulative share to 100% only.', true));
    }

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
      this.epfNominationService.deleteEPFNominee(this.dataSource[index].id!);

      this.dataSource.splice(index, 1);
      // if (this.dataSource.length >= 4) {
      //   this.maxEntriesReached = true;
      // } else {
      //   this.maxEntriesReached = false;
      // }
    }
  }

}
