import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidateDetails, CandidateDetailsService, Work } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalMessage, MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.scss']
})
export class ExperienceDetailsComponent implements OnInit {
  showProgressBar: boolean = true;
  experienceFormGroup: FormGroup;
  candidateDetails?: CandidateDetails;
  maxEntriesReached: boolean = false;
  workfrom: Date;
  workto: Date;
  dataSource?: Work[] = [];
  today = new Date();
  isNotApplicable: boolean = false;

  imageUrl: any;
  pdfUrl: any;
  fileUrl: any;
  fileName: any;
  fileType: any;

  imageUrl1: any;
  pdfUrl1: any;
  fileUrl1: any;
  fileName1: any;
  fileType1: any;

  isConsultant: Boolean = false;
  isDirectConsultant: boolean = false;
  isVendorConsultant: boolean = false;


  constructor(public loaderService: LoaderService,
    private candidateDetailsService: CandidateDetailsService,
    private messagingService: MessagingService) {
    this.experienceFormGroup = new FormGroup({
      id: new FormControl(),
      companyName: new FormControl(null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      designation: new FormControl(null, Validators.required),
      workedFrom: new FormControl(null, Validators.required),
      workedTo: new FormControl(null, Validators.required),
      industryType: new FormControl(null, Validators.required),
      organizationType: new FormControl(null, Validators.required),
      workImage: new FormControl(null),
      workImage1: new FormControl(null)
    });
    this.workfrom = new Date();
    this.workto = new Date();
  }

  ngOnInit(): void {
    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    if (this.candidateDetails?.workList !== null) {
      this.dataSource = this.candidateDetails?.workList!;
      if (this.dataSource) {
        if (this.dataSource[0]?.companyName === 'NA') {
          this.isNotApplicable = true;
        }
      }
    }

    this.candidateDetailsService.candidateDetailsSubject.subscribe(
      candidateDetails => {
        this.candidateDetails = candidateDetails;
        if (candidateDetails?.workList !== null) {
          this.dataSource = candidateDetails?.workList!;
          if (this.dataSource) {
            if (this.dataSource[0]?.companyName === 'NA') {
              this.isNotApplicable = true;
            }
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
    this.fileUrl1 = this.isConsultant = sessionStorage.getItem('category') === 'Consultant' ? true : false;

    this.fileUrl = this.isDirectConsultant = sessionStorage.getItem('category') === 'Direct Consultant' ? true : false;

    this.fileUrl1 = this.isVendorConsultant = sessionStorage.getItem('category') === 'Vendor Consultant' ? true : false;
  }

  get expDataSource(): Work[] {
    return this.dataSource ?? [];
  }

  get experienceFormControl() {
    return this.experienceFormGroup.controls;
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

  onImage1Selected(event: any) {
    if (event.target.files[0].size < 2097152) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        let file = event.target.files[0];
        this.fileName1 = file.name;
        this.fileType1 = file.type;

        reader.readAsDataURL(file);
        reader.onload = (event) => {
          this.fileUrl = event.target?.result;
          if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/x-eps') {
            this.imageUrl1 = event.target?.result;
            this.pdfUrl1 = null;
            this.messagingService.reportMessage(new LocalMessage('Image ' + file.name + ' is selected', false));
          } else if (file.type === "application/pdf") {
            this.pdfUrl1 = event.target?.result;
            this.imageUrl1 = null;
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

    if (this.fileType1 === 'application/pdf') {
      this.fileUrl1 = this.pdfUrl1;
    } else {
      this.fileUrl1 = this.imageUrl1;
    }

    let work: Work = {
      companyName: this.experienceFormControl.companyName.value,
      designation: this.experienceFormControl.designation.value,
      workedFrom: new Date(this.experienceFormControl.workedFrom.value).getTime(),
      workedTo: new Date(this.experienceFormControl.workedTo.value).getTime(),
      industryType: this.experienceFormControl.industryType.value,
      organizationType: this.experienceFormControl.organizationType.value,
      workImage: this.fileUrl,
      fileType: this.fileType,
      workImage1: this.fileUrl1,
      fileType1: this.fileType1
    };

    this.dataSource?.push(work);
    this.candidateDetailsService.saveExperienceDetails(work);

    this.imageUrl = null;
    this.pdfUrl = null;
    this.fileUrl = null;
    this.imageUrl1 = null;
    this.pdfUrl1 = null;
    this.fileUrl1 = null;
    this.experienceFormGroup.reset();

    // if (this.dataSource) {
    //   if (this.dataSource.length >= 5) {
    //     this.maxEntriesReached = true;
    //   } else {
    //     this.maxEntriesReached = false;
    //   }
    // }
    this.fileUrl = this.isDirectConsultant = sessionStorage.getItem('category') === 'Direct Consultant' ? true : false;
    this.fileUrl1 = this.isVendorConsultant = sessionStorage.getItem('category') === 'Vendor Consultant' ? true : false;
  }

  checkboxChecked() {
    this.isNotApplicable = !this.isNotApplicable;
    if (this.isNotApplicable === true) {
      let work: Work = {
        companyName: "NA",
        designation: "NA",
        workedFrom: 0,
        workedTo: 0,
        industryType: "NA",
        organizationType: "NA",
        workImage: "NA",
        fileType: "NA",
        workImage1: "NA",
        fileType1: "NA",
      };
      if (this.dataSource?.length! > 0) {
        this.messagingService.reportMessage(new LocalMessage('Experience already exists!!!', true));
        this.isNotApplicable = false;
      } else {
        this.dataSource?.push(work);
        this.candidateDetailsService.saveExperienceDetails(work);
        this.experienceFormGroup.reset();
      }
    }
  }

  removeLine(index: number) {
    if (this.dataSource) {
      this.candidateDetailsService.deleteExperienceDetails(this.dataSource[index].id!);
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
