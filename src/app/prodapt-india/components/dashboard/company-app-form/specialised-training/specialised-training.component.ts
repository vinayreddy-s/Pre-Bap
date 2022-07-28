import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidateDetails, CandidateDetailsService, Specialization } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalMessage, MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-specialised-training',
  templateUrl: './specialised-training.component.html',
  styleUrls: ['./specialised-training.component.scss']
})
export class SpecialisedTrainingComponent implements OnInit {
  showProgressBar: boolean = true;
  trainingFormGroup: FormGroup;
  candidateDetails?: CandidateDetails;
  doc: Date;
  maxEntriesReached: boolean = false;
  dataSource?: Specialization[] = [];
  isNotApplicable: boolean = false;
  today = new Date();

  imageUrl: any;
  pdfUrl: any;
  fileUrl: any;
  fileName: any;
  fileType: any;
  isConsultant: Boolean = false;

  constructor(public loaderService: LoaderService,
    private candidateDetailsService: CandidateDetailsService,
    private messagingService: MessagingService) {
    this.trainingFormGroup = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      details: new FormControl(null, Validators.required),
      dateOfCompletion: new FormControl(null, Validators.required),
      specializationImage: new FormControl(null)
    });
    this.doc = new Date();
  }

  ngOnInit(): void {
    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    if (this.candidateDetails?.specializationList !== null) {
      this.dataSource = this.candidateDetails?.specializationList!;
      if (this.dataSource) {
        if (this.dataSource[0]?.name === 'NA') {
          this.isNotApplicable = true;
        }
      }
    }

    this.candidateDetailsService.candidateDetailsSubject.subscribe(
      candidateDetails => {
        this.candidateDetails = candidateDetails;
        if (candidateDetails?.specializationList !== null) {
          this.dataSource = candidateDetails?.specializationList!;
          if (this.dataSource[0]?.name === 'NA') {
            this.isNotApplicable = true;
          }
        }
      }
    );

    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;
    }

    // if (this.dataSource) {
    //   if (this.dataSource.length >= 5) {
    //     this.maxEntriesReached = true;
    //   } else {
    //     this.maxEntriesReached = false;
    //   }
    // }
    this.fileUrl = this.isConsultant = sessionStorage.getItem('category') === 'Consultant' ? true : false;
  }

  get trainingDataSource(): Specialization[] {
    return this.dataSource ?? [];
  }

  get trainingFormControl() {
    return this.trainingFormGroup.controls;
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000';
    }
  }

  onImageSelected(event: any) {
    if (event.target.files[0].size < 2097152) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        let file = event.target.files[0];
        this.fileName = file.name;
        this.fileType = file.type;

        reader.readAsDataURL(file);
        reader.onload = (event) => {
          this.fileUrl = event.target?.result;
          if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/x-eps') {
            this.imageUrl = event.target?.result;
            this.pdfUrl = null;
            this.messagingService.reportMessage(new LocalMessage('Image ' + file.name + ' is selected', false));
          } else if (file.type === "application/pdf") {
            this.pdfUrl = event.target?.result;
            this.imageUrl = null;
            this.messagingService.reportMessage(new LocalMessage('PDF ' + file.name + ' is selected', false));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Wrong File Selection, Please Select JPEG, PNG Images or PDF Files', true));
          }
        }
      }
    } else {
      this.messagingService.reportMessage(new LocalMessage('File size should be less then 2 MB', true));
    }
  }

  addLine() {

    if (this.fileType === 'application/pdf') {
      this.fileUrl = this.pdfUrl;
    } else {
      this.fileUrl = this.imageUrl;
    }

    let spec: Specialization = {
      name: this.trainingFormControl.name.value,
      details: this.trainingFormControl.details.value,
      dateOfCompletion: new Date(this.trainingFormControl.dateOfCompletion.value).getTime(),
      specializationImage: this.fileUrl,
      fileType: this.fileType
    };

    if (!this.isNotApplicable) {
      this.dataSource?.push(spec);
      this.candidateDetailsService.saveSpecialization(spec);
      this.trainingFormGroup.reset();
      this.imageUrl = null;
      this.pdfUrl = null;
      this.fileUrl = null;
    } else {
      this.messagingService.reportMessage(new LocalMessage('Please Delete Not Applicable Row!!!', true));
    }

    // if (this.dataSource) {
    //   if (this.dataSource.length >= 5) {
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
      let spec: Specialization = {
        name: "NA",
        details: "NA",
        dateOfCompletion: 0,
        specializationImage: "NA",
        fileType: "NA"
      };
      if (this.dataSource?.length! > 0) {
        this.messagingService.reportMessage(new LocalMessage('Certifications already exists!!!', true));
        this.isNotApplicable = false;
      } else {
        this.dataSource?.push(spec);
        this.candidateDetailsService.saveSpecialization(spec);
        this.trainingFormGroup.reset();
      }
    }
  }

  removeLine(index: number) {
    if (this.dataSource) {
      this.candidateDetailsService.deleteSpecialization(this.dataSource[index].id!);
      this.dataSource.splice(index, 1);
      this.isNotApplicable = false;

      // if (this.dataSource.length >= 5) {
      //   this.maxEntriesReached = true;
      // } else {
      //   this.maxEntriesReached = false;
      // }
    }
  }

}
