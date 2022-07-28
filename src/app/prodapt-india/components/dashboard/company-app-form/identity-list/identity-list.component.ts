import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { CandidateDetails, CandidateDetailsService, Identity } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { LocalMessage, MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-identity-list',
  templateUrl: './identity-list.component.html',
  styleUrls: ['./identity-list.component.scss']
})
export class IdentityListComponent implements OnInit {

  showProgressBar: boolean = true;
  maxEntriesReached: boolean = false;
  identityFormGroup: FormGroup;
  candidateDetails?: CandidateDetails;
  docFrom: Date;
  docTo: Date;
  dataSource?: Identity[] = [];
  today = new Date();
  panRegex = '[A-Z]{5}[0-9]{4}[A-Z]{1}';
  aadhaarRegex = '^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$';
  aadhaarExists: boolean = false;
  panExists: boolean = false;
  docValues = [{ id: 1, docName: "Aadhaar Card" },
  { id: 1, docName: "PAN Card" },
  { id: 1, docName: "Passport" }];

  imageUrl: any;
  pdfUrl: any;
  fileUrl: any;
  fileName: any;
  fileType: any;
  isConsultant: Boolean = false;

  constructor(public loaderService: LoaderService,
    private candidateDetailsService: CandidateDetailsService,
    private messagingService: MessagingService) {
    this.identityFormGroup = new FormGroup({
      id: new FormControl(),
      docName: new FormControl(null, Validators.required),
      docNumber: new FormControl(),
      nameInDoc: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      docIssuedCountry: new FormControl(null, Validators.required),
      docValidFrom: new FormControl(null),
      docValidTo: new FormControl(null),
      identityImage: new FormControl(null)
    });
    this.docFrom = new Date();
    this.docTo = new Date();
  }

  ngOnInit(): void {
    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    if (this.candidateDetails?.identityList !== null) {
      this.dataSource = this.candidateDetails?.identityList!;
      this.dataSource?.map(identity => {
        if (identity.docName.includes('Aadhaar')) {
          this.aadhaarExists = true;
        }
        if (identity.docName.includes('PAN')) {
          this.panExists = true;
        }
      });
    }
    this.candidateDetailsService.candidateDetailsSubject.subscribe(
      candidateDetails => {
        this.candidateDetails = candidateDetails;
        if (candidateDetails?.identityList !== null) {
          this.dataSource = candidateDetails?.identityList!;
          this.dataSource?.map(identity => {
            if (identity.docName.includes('Aadhaar')) {
              this.aadhaarExists = true;
            }
            if (identity.docName.includes('PAN')) {
              this.panExists = true;
            }
          });
        }
      }
    );

    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;
    }
    if (this.dataSource) {
      if (this.dataSource.length >= 3) {
        this.maxEntriesReached = true;
      } else {
        this.maxEntriesReached = false;
      }
    }
    this.fileUrl = this.isConsultant = sessionStorage.getItem('category') === 'Consultant' ? true : false;
  }

  get identityDataSource(): Identity[] {
    return this.dataSource ?? [];
  }
  get identityDetailsFormControl() {
    return this.identityFormGroup.controls;
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

  docSelected() {
    if (this.identityDetailsFormControl.docName.value.includes('Aadhaar Card')) {
      this.identityDetailsFormControl.docNumber.setValidators([Validators.required, Validators.pattern('^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$')]);
    } else if (this.identityDetailsFormControl.docName.value.includes('PAN Card')) {
      this.identityDetailsFormControl.docNumber.setValidators([Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]);
    } else {
      this.identityDetailsFormControl.docNumber.setValidators([Validators.required]);
    }
  }

  // docSelected(event: Event) {
  //   console.log(event);
  //   // console.log(event?['target'].values().);
  //   var element = event.target as HTMLElement
  //   //this.identityDetailsFormControl.docName = element.value!;
  // }

  addLine() {
    if (this.identityFormGroup.valid) {
      if (this.fileType === 'application/pdf') {
        this.fileUrl = this.pdfUrl;
      } else {
        this.fileUrl = this.imageUrl;
      }

      let identity: Identity = {
        docName: this.identityDetailsFormControl.docName.value,
        docNumber: this.identityDetailsFormControl.docNumber.value,
        nameInDoc: this.identityDetailsFormControl.nameInDoc.value,
        docIssuedCountry: this.identityDetailsFormControl.docIssuedCountry.value,
        docValidFrom: new Date(this.identityDetailsFormControl.docValidFrom.value).getTime(),
        docValidTo: new Date(this.identityDetailsFormControl.docValidTo.value).getTime(),
        identityImage: this.fileUrl,
        fileType: this.fileType
      };

      if (!this.aadhaarExists && identity.docName.includes('Aadhaar')) {
        this.dataSource?.push(identity);
        this.aadhaarExists = true;
        this.candidateDetailsService.saveIdentityDetails(identity);
        this.imageUrl = null;
        this.pdfUrl = null;
        this.fileUrl = null;
        this.identityFormGroup.reset();
      } else if (!this.panExists && identity.docName.includes('PAN')) {
        this.dataSource?.push(identity);
        this.panExists = true;
        this.candidateDetailsService.saveIdentityDetails(identity);
        this.imageUrl = null;
        this.pdfUrl = null;
        this.fileUrl = null;
        this.identityFormGroup.reset();
      } else if (identity.docName.includes('Passport')) {
        this.dataSource?.push(identity);
        this.candidateDetailsService.saveIdentityDetails(identity);
        this.imageUrl = null;
        this.pdfUrl = null;
        this.fileUrl = null;
        this.identityFormGroup.reset();
      }
      else {
        this.messagingService.reportMessage(new LocalMessage('Aadhaar/PAN Details already exists!!!', true));
      }

      if (this.dataSource) {
        if (this.dataSource.length >= 3) {
          this.maxEntriesReached = true;
        } else {
          this.maxEntriesReached = false;
        }
      }
    } else {
      this.messagingService.reportMessage(new LocalMessage('Not a valid aadhaar!!!', true));
    }
  }

  removeLine(index: number) {
    if (this.dataSource) {
      this.candidateDetailsService.deleteIdentityDetails(this.dataSource[index].id!);

      this.dataSource.splice(index, 1);

      this.dataSource.map(identity => {
        if (identity.docName.includes('Aadhaar')) {
          this.aadhaarExists = true;
        } else {
          this.aadhaarExists = false;
        }

        if (identity.docName.includes('PAN')) {
          this.panExists = true;
        } else {
          this.panExists = false;
        }

      });

      if (this.dataSource.length >= 3) {
        this.maxEntriesReached = true;
      } else {
        this.maxEntriesReached = false;
      }
    }
  }

}
