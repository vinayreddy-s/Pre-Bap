import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidateDetails, CandidateDetailsService, RefPerson } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-refperson-list',
  templateUrl: './refperson-list.component.html',
  styleUrls: ['./refperson-list.component.scss']
})
export class RefpersonListComponent implements OnInit {

  showProgressBar: boolean = true;
  refpersonFormGroup: FormGroup;
  candidateDetails?: CandidateDetails;
  maxEntriesReached: boolean = false;
  dataSource?: RefPerson[] = [];

  constructor(public loaderService: LoaderService,
    private candidateDetailsService: CandidateDetailsService) {
    this.refpersonFormGroup = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      designation: new FormControl(null, Validators.required),
      mobileNumber: new FormControl(null, Validators.compose([Validators.minLength(10), Validators.pattern('[1-9][0-9]{9}'), Validators.required])),
      address: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    if (this.candidateDetails?.refPersonList !== null) {
      this.dataSource = this.candidateDetails?.refPersonList!;
    }
    this.candidateDetailsService.candidateDetailsSubject.subscribe(
      candidateDetails => {
        this.candidateDetails = candidateDetails;
        if (this.candidateDetails?.refPersonList !== null) {
          this.dataSource = this.candidateDetails?.refPersonList!;
        }
      }
    );

    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;
    }
    if (this.dataSource) {
      if (this.dataSource.length >= 2) {
        this.maxEntriesReached = true;
      } else {
        this.maxEntriesReached = false;
      }
    }
  }

  get refDataSource(): RefPerson[] {
    return this.dataSource ?? [];
  }

  get refFormControl() {
    return this.refpersonFormGroup.controls;
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000';
    }
  }

  addLine() {
    let refpersonDetails: RefPerson = {
      name: this.refFormControl.name.value,
      designation: this.refFormControl.designation.value,
      mobileNumber: this.refFormControl.mobileNumber.value,
      address: this.refFormControl.address.value
    };

    this.dataSource?.push(refpersonDetails);
    this.refpersonFormGroup.reset();

    this.candidateDetailsService.saveReferencePerson(refpersonDetails);
    if (this.dataSource) {
      if (this.dataSource.length >= 2) {
        this.maxEntriesReached = true;
      } else {
        this.maxEntriesReached = false;
      }
    }
  }

  removeLine(index: number) {
    if (this.dataSource) {
      this.candidateDetailsService.deleteReferencePerson(this.dataSource[index].id!);

      this.dataSource.splice(index, 1);
      if (this.dataSource.length >= 2) {
        this.maxEntriesReached = true;
      } else {
        this.maxEntriesReached = false;
      }
    }
  }

}
