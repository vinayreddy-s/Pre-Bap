import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EPFNomination, EpfNominationService, EPFNominee } from 'src/app/prodapt-india/services/epf-nomination/epf-nomination.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-formtwonominee-details',
  templateUrl: './formtwonominee-details.component.html',
  styleUrls: ['./formtwonominee-details.component.scss']
})
export class FormtwonomineeDetailsComponent implements OnInit {

  nomineeListFormGroup: FormGroup;
  maxEntriesReached: boolean = false;
  dataSource?: EPFNominee[] = [];
  epfNomination?: EPFNomination;
  showProgressBar: boolean = true;
  dob: Date;
  today = new Date();

  constructor(public loaderService: LoaderService,
    private epfNominationService: EpfNominationService) {
    this.nomineeListFormGroup = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      relationship: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
    });
    this.dob = new Date();
  }

  ngOnInit(): void {
    this.epfNomination = this.epfNominationService.epfNomination;
    if (this.epfNomination?.nomineeList !== null) {
      this.dataSource = this.epfNomination?.nomineeList!;
    }
    this.epfNominationService.epfNominationSubject.subscribe(
      epfNomination => {
        this.epfNomination = epfNomination;
        if (epfNomination?.nomineeList !== null) {
          this.dataSource = epfNomination?.nomineeList!;
        }
      });
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

  get nomineeListDataSource(): EPFNominee[] {
    return this.dataSource ?? [];
  }

  get nomineeListFormControl() {
    return this.nomineeListFormGroup.controls;
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000';
    }
  }

  addLine() {
    let nomineeList: EPFNominee = {
      name: this.nomineeListFormControl.name.value,
      relationship: this.nomineeListFormControl.relationship.value,
      dateOfBirth: new Date(this.nomineeListFormControl.dateOfBirth.value).getTime(),
      address: this.nomineeListFormControl.address.value
    };

    this.dataSource?.push(nomineeList);
    this.nomineeListFormGroup.reset();

    this.epfNominationService.saveEPFSecNominee(nomineeList);

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
      this.epfNominationService.deleteEPFSecNominee(this.dataSource[index].id!);

      this.dataSource.splice(index, 1);
      // if (this.dataSource.length >= 4) {
      //   this.maxEntriesReached = true;
      // } else {
      //   this.maxEntriesReached = false;
      // }
    }
  }

}
