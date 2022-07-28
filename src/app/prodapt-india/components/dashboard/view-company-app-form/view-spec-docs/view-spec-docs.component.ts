import { Component, OnInit } from '@angular/core';
import { CandidateDetails, CandidateDetailsService, Specialization } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-view-spec-docs',
  templateUrl: './view-spec-docs.component.html',
  styleUrls: ['./view-spec-docs.component.scss']
})
export class ViewSpecDocsComponent implements OnInit {
  showProgressBar: boolean = true;
  candidateDetails?: CandidateDetails;

  imageUrl: any;
  pdfUrl: any;
  fileUrl: any;
  fileName: any;
  fileType: any;
  dataSource: Specialization[] = [];

  constructor(private candidateDetailsService: CandidateDetailsService,
    public loaderService: LoaderService) {

  }

  ngOnInit(): void {
    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    if (this.candidateDetails?.specializationList !== null) {
      this.dataSource = this.candidateDetails?.specializationList!;
    }

    this.candidateDetailsService.candidateDetailsSubject.subscribe(
      candidateDetails => {
        this.candidateDetails = candidateDetails;

        if (candidateDetails?.specializationList !== null) {
          this.dataSource = candidateDetails?.specializationList!;
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
