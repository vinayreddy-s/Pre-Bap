import { Component, OnInit } from '@angular/core';
import { CandidateDetails, CandidateDetailsService, Identity } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-view-identity-docs',
  templateUrl: './view-identity-docs.component.html',
  styleUrls: ['./view-identity-docs.component.scss']
})
export class ViewIdentityDocsComponent implements OnInit {
  showProgressBar: boolean = true;
  candidateDetails?: CandidateDetails;

  imageUrl: any;
  pdfUrl: any;
  fileUrl: any;
  fileName: any;
  fileType: any;

  dataSource: Identity[] = [];

  constructor(private candidateDetailsService: CandidateDetailsService,
    public loaderService: LoaderService) {

  }

  ngOnInit(): void {
    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    if (this.candidateDetails?.identityList !== null) {
      this.dataSource = this.candidateDetails?.identityList!;
    }

    this.candidateDetailsService.candidateDetailsSubject.subscribe(
      candidateDetails => {
        this.candidateDetails = candidateDetails;

        if (candidateDetails?.identityList !== null) {
          this.dataSource = candidateDetails?.identityList!;
        }
      });

    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;
    }
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000';
    }
  }

}
