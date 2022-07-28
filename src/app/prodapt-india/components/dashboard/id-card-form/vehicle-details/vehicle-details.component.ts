import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IdCard, IdCardFormService, Vehicle } from 'src/app/prodapt-india/services/id-card-form/id-card-form.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalMessage, MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {
  showProgressBar: boolean = true;
  maxEntriesReached: boolean = false;
  vehicleFormGroup: FormGroup;
  idCard?: IdCard;
  dataSource?: Vehicle[] = [];
  isNotApplicable: boolean = false;

  constructor(public loaderService: LoaderService,
    private idCardService: IdCardFormService,
    private messagingService: MessagingService) {
    this.vehicleFormGroup = new FormGroup({
      type: new FormControl(null, Validators.required),
      make: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      regnNo: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.idCard = this.idCardService.idCard;
    if (this.idCard?.vehicleDetails !== null) {
      this.dataSource = this.idCard?.vehicleDetails!;
      if (this.dataSource) {
        if (this.dataSource[0].make === 'NA') {
          this.isNotApplicable = true;
        }
      }
    }

    this.idCardService.$idCardSubject.subscribe(
      idCard => {
        this.idCard = idCard;
        if (idCard?.vehicleDetails !== null) {
          this.dataSource = this.idCard?.vehicleDetails!;
          if (this.dataSource[0].make === 'NA') {
            this.isNotApplicable = true;
          }
        }
      });

    if (this.idCard?.empId !== null) {
      this.showProgressBar = false;
    }

    // if (this.dataSource) {
    //   if (this.dataSource.length >= 3) {
    //     this.maxEntriesReached = true;
    //   } else {
    //     this.maxEntriesReached = false;
    //   }
    // }
  }

  get vehicleDataSource(): Vehicle[] {
    return this.dataSource ?? [];
  }

  get vehicleDetailsFormControl() {
    return this.vehicleFormGroup.controls;
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000';
    }
  }

  addLine() {
    let vehicle: Vehicle = {
      type: this.vehicleDetailsFormControl.type.value,
      make: this.vehicleDetailsFormControl.make.value,
      model: this.vehicleDetailsFormControl.model.value,
      regnNo: this.vehicleDetailsFormControl.regnNo.value
    };
    if (!this.isNotApplicable) {
      this.dataSource?.push(vehicle);
      this.idCardService.saveVehicle(vehicle);
      this.vehicleFormGroup.reset();
    } else {
      this.messagingService.reportMessage(new LocalMessage('Please Delete Not Applicable Row!!!', true));
    }

    // if (this.dataSource) {
    //   if (this.dataSource.length >= 3) {
    //     this.maxEntriesReached = true;
    //   } else {
    //     this.maxEntriesReached = false;
    //   }
    // }
  }

  checkboxChecked() {
    this.isNotApplicable = !this.isNotApplicable;
    if (this.isNotApplicable === true) {
      let vehicle: Vehicle = {
        type: "NA",
        make: "NA",
        model: "NA",
        regnNo: "NA"
      };
      if (this.dataSource?.length! > 0) {
        this.messagingService.reportMessage(new LocalMessage('Vehicle Details already exists!!!', true));
        this.isNotApplicable = false;
      } else {
        this.dataSource?.push(vehicle);
        this.idCardService.saveVehicle(vehicle);
        this.vehicleFormGroup.reset();
      }
    }
  }

  removeLine(index: number) {
    if (this.dataSource) {
      this.idCardService.deleteVehicle(this.dataSource[index].id!)
      this.dataSource?.splice(index, 1);
      this.isNotApplicable = false;
      // if (this.dataSource?.length! >= 3) {
      //   this.maxEntriesReached = true;
      // } else {
      //   this.maxEntriesReached = false;
      // }
    }
  }

}
