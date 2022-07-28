import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candidate } from '../candidate/candidate.service';
import { LocalMessage, MessagingService } from '../../../services/messaging/messaging.service';

interface Token {
  jwtToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  editEnabledState = new BehaviorSubject(true);
  authenticationState = new BehaviorSubject(false);
  token?: Token;
  candidate?: Candidate;
  isCandidateApproved: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private messagingService: MessagingService,
    private router: Router) {
    this.isCandidateApproved = sessionStorage.getItem('empStatus') === 'Approved' ? true : false;
    this.editEnabledState.next(!this.isCandidateApproved);
  }

  get editEnabled(): Observable<boolean> {
    return this.editEnabledState.asObservable();
  }

  get isAuthenticated(): Observable<boolean> {
    // if (sessionStorage.getItem('jwtToken') !== null) {
    //   this.authenticationState.next(true);
    // } else {
    //   this.authenticationState.next(false);
    // }
    return this.authenticationState;
  }


  login(credentials: any): Observable<boolean> {

    let body = {
      "username": credentials.email,
      "password": credentials.password
    };

    sessionStorage.setItem('email', credentials.email);

    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.USER_LOGIN_URL}`,
      body,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        })
      })
      .subscribe(
        data => {
          this.token = data as Token;
          sessionStorage.setItem('jwtToken', this.token.jwtToken);

          this.httpClient.get(`${environment.API_ENDPOINT}` + `${environment.GET_CAND_BY_EMAIL}` + credentials.email,
            {
              headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
              })
            })
            .subscribe(
              user => {
                this.candidate = user as Candidate;
                sessionStorage.setItem('empId', this.candidate.id!);
                sessionStorage.setItem('empName', this.candidate.name);
                sessionStorage.setItem('empEmail', this.candidate.email);
                sessionStorage.setItem('empCountry', this.candidate.country);
                sessionStorage.setItem('empRegion', this.candidate.region!);
                sessionStorage.setItem('empStatus', this.candidate.status!);
                sessionStorage.setItem('role', this.candidate.role!);
                sessionStorage.setItem('category', this.candidate.category!);
               
                this.isCandidateApproved = sessionStorage.getItem('empStatus') === 'Approved' ? true : false;
                this.editEnabledState.next(!this.isCandidateApproved);

                if (this.candidate.role === 'USER') {
                  this.authenticationState.next(true);
                  this.messagingService.reportMessage(new LocalMessage('Login Successful!', false));
                }
                else {
                  this.messagingService.reportMessage(new LocalMessage('Wrong Crendentials, Please login with HR portal!', true));
                  sessionStorage.clear();
                  this.authenticationState.next(false);
                }

              },
              error => {
                console.log(error);
                this.messagingService.reportMessage(new LocalMessage('Failed to get User Details', true));
              }
            );
        },
        error => {
          console.log(error);
          this.messagingService.reportMessage(new LocalMessage('Login Failed!', true));
          this.authenticationState.next(false);
        }
      );
    return this.authenticationState;
  }

  logout(): Observable<boolean> {
    sessionStorage.clear();
    this.authenticationState.next(false);
    this.editEnabledState.next(false);
    this.messagingService.reportMessage(new LocalMessage('Logged Out!', false));
    this.router.navigateByUrl('/login');
    return this.authenticationState;
  }

}
