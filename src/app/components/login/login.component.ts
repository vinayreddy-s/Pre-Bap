import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/prodapt-india/services/auth/auth.service';
import { Candidate, CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ConsentDialogComponent } from '../../prodapt-india/components/dialogs/consent-dialog/consent-dialog.component';
import { IntroDialogComponent } from '../../prodapt-india/components/dialogs/intro-dialog/intro-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  accepted: boolean = false;
  loginFormGroup: FormGroup;
  candidate?: Candidate;

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    private matDialog: MatDialog,
    private candidateService: CandidateService,
    private router: Router) {
    this.loginFormGroup = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      consent: new FormControl(null, Validators.compose([Validators.required, Validators.pattern('true')]))
    });
  }

  ngOnInit(): void {
    this.loaderService.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false;

    this.authService.isAuthenticated.subscribe(bool => {
      if (bool) {
        this.router.navigateByUrl('/dashboard')
      }
    });

    // this.candidate = this.candidateService.candidate;
    this.candidateService.candidateSubject.subscribe(candidate => {
      this.candidate = candidate;
    })

  }

  get loginFormControl() {
    return this.loginFormGroup.controls;
  }

  onSubmit() {
    if (this.loginFormGroup.valid) {
      this.authService.login(this.loginFormGroup.value).subscribe(bool => {
        if (bool) {

          const consentDialogRef = this.matDialog.open(IntroDialogComponent, {
            width: '600px',
          })

          // consentDialogRef.afterClosed().subscribe(
          //   bool => {
          //     if (this.candidate) {
          //       if (bool) {
          //         this.candidate.consentFormAccepted = true;
          //         this.candidateService.updateCandidate(this.candidate);
          //       }
          //     }
          //   }
          // );
        }
      });
    }
  }
}
