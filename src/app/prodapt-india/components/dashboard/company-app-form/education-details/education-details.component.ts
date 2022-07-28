import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidateDetails, CandidateDetailsService, Education } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalMessage, MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.scss']
})
export class EducationDetailsComponent implements OnInit {
  showProgressBar: boolean = true;
  candidateDetails?: CandidateDetails;
  educationFormGroup: FormGroup;
  maxEntriesReached: boolean = false;

  dataSource?: Education[] = [];
  stuFrom: Date;
  stuTo: Date;
  today = new Date();

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

  imageUrl2: any;
  pdfUrl2: any;
  fileUrl2: any;
  fileName2: any;
  fileType2: any;

  isConsultant: Boolean = false;
  isDirectConsultant: boolean = false;
  isVendorConsultant: boolean = false;
  isShorttermIntern: boolean = false;
  isIntern: boolean = false;


  constructor(public loaderService: LoaderService,
    private candidateDetailsService: CandidateDetailsService,
    private messagingService: MessagingService) {
    this.educationFormGroup = new FormGroup({
      id: new FormControl(),
      educationName: new FormControl(null, Validators.required),
      institution: new FormControl(null, Validators.required),
      boardOrUniversity: new FormControl(null, Validators.required),
      studiedFrom: new FormControl(null, Validators.required),
      studiedTo: new FormControl(null, Validators.required),
      specialization: new FormControl(null, Validators.required),
      educationImage: new FormControl(null),
      educationImage1: new FormControl(null),
      educationImage2: new FormControl(null)
    });
    this.stuFrom = new Date();
    this.stuTo = new Date();
  }

  ngOnInit(): void {
    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    if (this.candidateDetails?.educationList !== null) {
      this.dataSource = this.candidateDetails?.educationList!;
    }

    this.candidateDetailsService.candidateDetailsSubject.subscribe(
      candidateDetails => {
        this.candidateDetails = candidateDetails;
        if (candidateDetails?.educationList !== null) {
          this.dataSource = candidateDetails?.educationList!;
        }
      });

    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;
    }

    // if (this.dataSource) {
    //   if (this.dataSource.length >= 6) {
    //     this.maxEntriesReached = true;
    //   } else {
    //     this.maxEntriesReached = false;
    //   }
    // }

    this.fileUrl = this.isConsultant = sessionStorage.getItem('category') === 'Consultant' ? true : false;
    this.fileUrl1 = this.isConsultant = sessionStorage.getItem('category') === 'Consultant' ? true : false;

    this.isDirectConsultant = sessionStorage.getItem('category') === 'Direct Consultant' ? true : false;
    this.isVendorConsultant = sessionStorage.getItem('category') === 'Vendor Consultant' ? true : false;
    if (this.isDirectConsultant || this.isVendorConsultant) {
      this.fileUrl = true;
    }
    this.fileUrl1 = this.isShorttermIntern = sessionStorage.getItem('category') === 'Short-term Intern' ? true : false;

    this.fileUrl2 = this.isIntern = sessionStorage.getItem('category') === 'Intern' ? true : false;

  }

  get eduDataSource(): Education[] {
    return this.dataSource ?? [];
  }

  get educationFormControl() {
    return this.educationFormGroup.controls;
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

  onImage2Selected(event: any) {
    if (event.target.files[0].size < 2097152) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        let file = event.target.files[0];
        this.fileName2 = file.name;
        this.fileType2 = file.type;
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          this.fileUrl = event.target?.result;
          if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/x-eps') {
            this.imageUrl2 = event.target?.result;
            this.pdfUrl2 = null;
            this.messagingService.reportMessage(new LocalMessage('Image ' + file.name + ' is selected', false));
          } else if (file.type === "application/pdf") {
            this.pdfUrl2 = event.target?.result;
            this.imageUrl2 = null;
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

    if (this.fileType2 === 'application/pdf') {
      this.fileUrl2 = this.pdfUrl2;
    } else {
      this.fileUrl2 = this.imageUrl2;
    }

    let education: Education = {
      educationName: this.educationFormControl.educationName.value,
      institution: this.educationFormControl.institution.value,
      boardOrUniversity: this.educationFormControl.boardOrUniversity.value,
      studiedFrom: new Date(this.educationFormControl.studiedFrom.value).getTime(),
      studiedTo: new Date(this.educationFormControl.studiedTo.value).getTime(),
      specialization: this.educationFormControl.specialization.value,
      educationImage: this.fileUrl,
      fileType: this.fileType,
      educationImage1: this.fileUrl1,
      fileType1: this.fileType1,
      educationImage2: this.fileUrl2,
      fileType2: this.fileType2
    };

    this.dataSource?.push(education);
    this.candidateDetailsService.saveEducationDetails(education);


    this.imageUrl = null;
    this.pdfUrl = null;
    this.fileUrl = null;
    this.imageUrl1 = null;
    this.pdfUrl1 = null;
    this.fileUrl1 = null;
    this.imageUrl2 = null;
    this.pdfUrl2 = null;
    this.fileUrl2 = null;
    this.educationFormGroup.reset();

    // if (this.dataSource) {
    //   if (this.dataSource.length >= 6) {
    //     this.maxEntriesReached = true;
    //   } else {
    //     this.maxEntriesReached = false;
    //   }
    // }
    this.isDirectConsultant = sessionStorage.getItem('category') === 'Direct Consultant' ? true : false;
    this.isVendorConsultant = sessionStorage.getItem('category') === 'Vendor Consultant' ? true : false;
    if (this.isDirectConsultant || this.isVendorConsultant) {
      this.fileUrl = true;
    }
    this.fileUrl1 = this.isShorttermIntern = sessionStorage.getItem('category') === 'Short-term Intern' ? true : false;

    this.fileUrl2 = this.isIntern = sessionStorage.getItem('category') === 'Intern' ? true : false;
  }

  removeLine(index: number) {
    if (this.dataSource) {
      this.candidateDetailsService.deleteEducationDetails(this.dataSource[index].id!);

      this.dataSource.splice(index, 1);
      // if (this.dataSource.length >= 6) {
      //   this.maxEntriesReached = true;
      // } else {
      //   this.maxEntriesReached = false;
      // }
    }
  }

}
