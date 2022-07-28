import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Candidate, CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';

@Component({
  selector: 'app-consent-dialog',
  templateUrl: './consent-dialog.component.html',
  styleUrls: ['./consent-dialog.component.scss']
})
export class ConsentDialogComponent implements OnInit {

  candidate?: Candidate;

  constructor(private candidateService: CandidateService,
    private dialogRef: MatDialogRef<ConsentDialogComponent>
  ) {

    this.candidate = this.candidateService.candidate;
    this.candidateService.subject.subscribe(
      candidate => {
        this.candidate = candidate;
      });
  }

  ngOnInit(): void {
  }

  onCancelClick() {
    this.dialogRef.close(false);
  }

  onAcceptedClick() {
    this.dialogRef.close(true);
  }

}
