import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidateDetails, CandidateDetailsService, Travel } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalMessage, MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html',
  styleUrls: ['./travel-details.component.scss']
})
export class TravelDetailsComponent implements OnInit {
  showProgressBar: boolean = true;
  travelFormGroup: FormGroup;
  maxEntriesReached: boolean = false;
  candidateDetails?: CandidateDetails;
  dataSource?: Travel[] = [];
  travelfrom: Date;
  travelto: Date;
  isNotApplicable: boolean = false;
  today = new Date();

  constructor(public loaderService: LoaderService,
    private candidateDetailsService: CandidateDetailsService,
    private messagingService: MessagingService) {
    this.travelFormGroup = new FormGroup({
      id: new FormControl(),
      countryVisited: new FormControl(null, Validators.required),
      travelType: new FormControl(null, Validators.required),
      stayedFrom: new FormControl(null, Validators.required),
      stayedTo: new FormControl(null, Validators.required),
      visaIssuedEmbassy: new FormControl(null, Validators.required),
      visaType: new FormControl(null, Validators.required)
    });
    this.travelfrom = new Date();
    this.travelto = new Date();
  }

  ngOnInit(): void {

    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    if (this.candidateDetails?.travelList !== null) {
      this.dataSource = this.candidateDetails?.travelList!;
      if (this.dataSource) {
        if (this.dataSource[0]?.countryVisited === 'NA') {
          this.isNotApplicable = true;
        }
      }
    }
    this.candidateDetailsService.candidateDetailsSubject.subscribe(
      candidateDetails => {
        this.candidateDetails = candidateDetails;
        if (candidateDetails?.travelList !== null) {
          this.dataSource = candidateDetails?.travelList!;
          if (this.dataSource[0]?.countryVisited === 'NA') {
            this.isNotApplicable = true;
          }
        }
      }
    );

    if (this.candidateDetails?.empId !== null) {
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

  get travelDataSource(): Travel[] {
    return this.dataSource ?? [];
  }

  get travelFormControl() {
    return this.travelFormGroup.controls;
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000';
    }
  }

  addLine() {
    let travel: Travel = {
      countryVisited: this.travelFormControl.countryVisited.value,
      travelType: this.travelFormControl.travelType.value,
      stayedFrom: new Date(this.travelFormControl.stayedFrom.value).getTime(),
      stayedTo: new Date(this.travelFormControl.stayedTo.value).getTime(),
      visaIssuedEmbassy: this.travelFormControl.visaIssuedEmbassy.value,
      visaType: this.travelFormControl.visaIssuedEmbassy.value
    };

    if (!this.isNotApplicable) {
      this.dataSource?.push(travel);
      this.candidateDetailsService.saveTravelDetails(travel);
      this.travelFormGroup.reset();
    } else {
      this.messagingService.reportMessage(new LocalMessage('Please Delete Not Applicable Row!!!', true));
    }

    // if (this.dataSource) {
    //   if (this.dataSource.length >= 3) {
    //     this.maxEntriesReached = true;
    //   }
    //   else {
    //     this.maxEntriesReached = false;
    //   }
    // }
  }

  checkboxChecked() {
    this.isNotApplicable = !this.isNotApplicable;
    if (this.isNotApplicable === true) {
      let travel: Travel = {
        countryVisited: "NA",
        travelType: "NA",
        stayedFrom: 0,
        stayedTo: 0,
        visaIssuedEmbassy: "NA",
        visaType: "NA"
      };
      if (this.dataSource?.length! > 0) {
        this.messagingService.reportMessage(new LocalMessage('Speialised Training already exists!!!', true));
        this.isNotApplicable = false;
      } else {
        this.dataSource?.push(travel);
        this.candidateDetailsService.saveTravelDetails(travel);
        this.travelFormGroup.reset();
      }
    }
  }

  removeLine(index: number) {
    if (this.dataSource) {
      this.candidateDetailsService.deleteTravelDetails(this.dataSource[index].id!);
      this.dataSource.splice(index, 1);
      this.isNotApplicable = false;
      // if (this.dataSource.length >= 3) {
      //   this.maxEntriesReached = true;
      // } else {
      //   this.maxEntriesReached = false;
      // }
    }
  }

}
