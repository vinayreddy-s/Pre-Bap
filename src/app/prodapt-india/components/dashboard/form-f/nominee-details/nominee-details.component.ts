import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { routeTransitionAnimations } from 'src/app/routing/route-transition-animation';
import { Gratuity, GratuityFormFService, GratuityNominee } from 'src/app/prodapt-india/services/gratuity-form-f/gratuity-form-f.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalMessage, MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-nominee-details',
  templateUrl: './nominee-details.component.html',
  styleUrls: ['./nominee-details.component.scss'],
  animations: [routeTransitionAnimations]
})
export class NomineeDetailsComponent implements OnInit {
  nomineeDetailsFormGroup: FormGroup;
  maxEntriesReached: boolean = false;
  dataSource?: GratuityNominee[] = [];
  showProgressBar: boolean = true;
  gratuity?: Gratuity;

  constructor(private gratuityFormService: GratuityFormFService,
    private messagingService: MessagingService,
    public loaderService: LoaderService,) {
    this.nomineeDetailsFormGroup = new FormGroup({
      name: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      relationship: new FormControl(null, Validators.required),
      proportion: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.gratuity = this.gratuityFormService.gratuity;
    if (this.gratuity?.nomineeList != null) {
      this.dataSource = this.gratuity?.nomineeList!;
    }
    this.gratuityFormService.gratuitySubject.subscribe(
      gratuity => {
        this.gratuity = gratuity;
        if (this.gratuity?.nomineeList != null) {
          this.dataSource = this.gratuity?.nomineeList!;
        }
      });
    if (this.gratuity?.empId !== null) {
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

  get nomineeDataSource(): GratuityNominee[] {
    return this.dataSource ?? [];
  }

  get nomineeDetailsFormControl() {
    return this.nomineeDetailsFormGroup.controls;
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000';
    }
  }

  addLine() {
    let gratuityNominee: GratuityNominee = {
      name: this.nomineeDetailsFormControl.name.value,
      relationship: this.nomineeDetailsFormControl.relationship.value,
      proportion: this.nomineeDetailsFormControl.proportion.value,
      age: this.nomineeDetailsFormControl.age.value,
      address: this.nomineeDetailsFormControl.address.value,
    };

    var totalProportion: number = 0;
    this.dataSource?.forEach(nDetails => {
      totalProportion += nDetails.proportion;
    });

    if ((totalProportion + gratuityNominee.proportion) <= 100) {
      this.dataSource?.push(gratuityNominee);
      this.gratuityFormService.saveGratuityNominee(gratuityNominee);
      this.nomineeDetailsFormGroup.reset();
    } else {
      this.messagingService.reportMessage(new LocalMessage
        ('Total Proportion has exceeded 100%, Pls limit to the cumulative proportion to 100% only.', true));
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
      this.gratuityFormService.deleteGratuityNominee(this.dataSource[index].id!);

      this.dataSource.splice(index, 1);
      // if (this.dataSource.length >= 4) {
      //   this.maxEntriesReached = true;
      // } else {
      //   this.maxEntriesReached = false;
      // }
    }
  }

}
