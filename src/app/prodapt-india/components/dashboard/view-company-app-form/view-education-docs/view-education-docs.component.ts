import { Component, OnInit } from '@angular/core';
import { CandidateDetails, CandidateDetailsService, Education } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-view-education-docs',
  templateUrl: './view-education-docs.component.html',
  styleUrls: ['./view-education-docs.component.scss']
})
export class ViewEducationDocsComponent implements OnInit {
  showProgressBar: boolean = true;
  candidateDetails?: CandidateDetails;

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

  dataSource: Education[] = [];

  constructor(private candidateDetailsService: CandidateDetailsService,
    public loaderService: LoaderService) {

  }

  ngOnInit(): void {
    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    if (this.candidateDetails?.educationList !== null) {
      this.dataSource = this.candidateDetails?.educationList!;
    }

    this.candidateDetailsService.candidateDetailsSubject.subscribe(
      candidate => {
        this.candidateDetails = candidate;
        if (candidate?.educationList !== null) {
          this.dataSource = candidate?.educationList!;
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
