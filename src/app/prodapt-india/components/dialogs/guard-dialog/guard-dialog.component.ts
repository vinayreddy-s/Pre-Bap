import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  formName: string;
}

@Component({
  selector: 'app-guard-dialog',
  templateUrl: './guard-dialog.component.html',
  styleUrls: ['./guard-dialog.component.scss']
})
export class GuardDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<GuardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {

  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
