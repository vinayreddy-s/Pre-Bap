import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UpdatePasswordDetails } from 'src/app/prodapt-india/services/candidate/candidate.service';

@Component({
  selector: 'app-update-password-dialog',
  templateUrl: './update-password-dialog.component.html',
  styleUrls: ['./update-password-dialog.component.scss']
})
export class UpdatePasswordDialogComponent implements OnInit {
  formGroup: FormGroup;
  check: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<UpdatePasswordDialogComponent>
  ) {
    this.formGroup = new FormGroup({
      newPassword: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    });
  }

  get formGroupControl() {
    return this.formGroup.controls;
  }
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkEqual() {
    if (this.formGroupControl.newPassword.value !== null && this.formGroupControl.confirmPassword.value !== null)
      if (this.formGroupControl.newPassword.value.length > 0 && this.formGroupControl.confirmPassword.value.length > 0)
        if (this.formGroupControl.newPassword.value.localeCompare(this.formGroupControl.confirmPassword.value) === 0) {
          this.check = true;
        } else {
          this.check = false;
        }
  }

  onSubmit(): void {
    let updatePasswordDetails: UpdatePasswordDetails = {
      newPassword: this.formGroupControl.newPassword.value,
      confirmPassword: this.formGroupControl.confirmPassword.value
    }

    if (this.formGroup.valid && this.check) {
      this.dialogRef.close(updatePasswordDetails);
    }
  }
}
