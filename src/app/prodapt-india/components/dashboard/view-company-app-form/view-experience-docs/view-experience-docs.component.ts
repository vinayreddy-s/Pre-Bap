import { Component, OnInit } from '@angular/core';
import { CandidateDetails, CandidateDetailsService, Work } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-view-experience-docs',
  templateUrl: './view-experience-docs.component.html',
  styleUrls: ['./view-experience-docs.component.scss']
})
export class ViewExperienceDocsComponent implements OnInit {
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

  dataSource: Work[] = [];

  constructor(private candidateDetailsService: CandidateDetailsService,
    public loaderService: LoaderService) {

  }

  ngOnInit(): void {
    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    if (this.candidateDetails?.workList !== null) {
      this.dataSource = this.candidateDetails?.workList!;
    }
    this.candidateDetailsService.candidateDetailsSubject.subscribe(
      candidateDetails => {
        this.candidateDetails = candidateDetails;
        if (candidateDetails?.workList !== null) {
          this.dataSource = candidateDetails?.workList!;
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
