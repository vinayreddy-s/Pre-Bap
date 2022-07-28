import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onDeleteClick(): void {
    this.dialogRef.close(true);
  }

}
