import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Mediclaim, MediclaimFormService as MediclaimFormService, Relation } from 'src/app/prodapt-india/services/medi-claim-form/medi-claim-form.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalMessage, MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-medi-fam-details',
  templateUrl: './medi-fam-details.component.html',
  styleUrls: ['./medi-fam-details.component.scss']
})
export class MediFamDetailsComponent implements OnInit {
  showProgressBar: boolean = true;
  maxEntriesReached: boolean = false;
  medifamFormGroup: FormGroup;
  mediclaim?: Mediclaim;
  dob: Date;
  today = new Date();
  dataSource?: Relation[] = [];

  constructor(public loaderService: LoaderService,
    private mediclaimService: MediclaimFormService,
    private messagingService: MessagingService) {
    this.medifamFormGroup = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      isDependant: new FormControl(null, Validators.required),
    });
    this.dob = new Date();
  }

  ngOnInit(): void {

    this.mediclaim = this.mediclaimService.mediclaim;
    if (this.mediclaim?.relationList !== null) {
      this.dataSource = this.mediclaim?.relationList!;
    }

    this.mediclaimService.mediclaimSubject.subscribe(
      mediclaim => {
        this.mediclaim = mediclaim;
        if (mediclaim?.relationList !== null) {
          this.dataSource = this.mediclaim?.relationList!;
        }
      });

    if (this.mediclaim?.empId !== null) {
      this.showProgressBar = false;
    }
    if (this.dataSource) {
      if (this.dataSource.length >= 6) {
        this.maxEntriesReached = true;
      } else {
        this.maxEntriesReached = false;
      }
    }
  }

  get familyDataSource(): Relation[] {
    return this.dataSource ?? [];
  }
  get familyDetailsFormControl() {
    return this.medifamFormGroup.controls;
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000';
    }
  }

  addLine() {
    let relation: Relation = {
      name: this.familyDetailsFormControl.name.value,
      type: this.familyDetailsFormControl.type.value,
      gender: this.familyDetailsFormControl.gender.value,
      dateOfBirth: new Date(this.familyDetailsFormControl.dateOfBirth.value).getTime(),
      isDependant: this.familyDetailsFormControl.isDependant.value
    };

    var eldersCount = 0;
    this.dataSource?.forEach(relation => {
      if (relation.type.includes('Father') || relation.type.includes('Mother')) {
        eldersCount += 1;
      }
    });

    if (eldersCount < 2) {
      this.dataSource?.push(relation);
      this.mediclaimService.saveRelationInfo(relation);
      this.medifamFormGroup.reset();
    } else if (!(relation.type.includes('Father') || relation.type.includes('Mother'))) {
      this.dataSource?.push(relation);
      this.mediclaimService.saveRelationInfo(relation);
      this.medifamFormGroup.reset();
    }
    else {
      this.messagingService.reportMessage(new LocalMessage
        ('Maximum 2 entires of elders is accepted', true));
    }

    if (this.dataSource) {
      if (this.dataSource.length >= 6) {
        this.maxEntriesReached = true;
      } else {
        this.maxEntriesReached = false;
      }
    }
  }

  removeLine(index: number) {
    if (this.dataSource) {
      this.mediclaimService.deleteRelationInfo(this.dataSource[index].id!);

      this.dataSource.splice(index, 1);
      if (this.dataSource.length >= 6) {
        this.maxEntriesReached = true;
      } else {
        this.maxEntriesReached = false;
      }
    }
  }

}
