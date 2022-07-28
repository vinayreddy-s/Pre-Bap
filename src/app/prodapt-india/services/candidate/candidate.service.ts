import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Email, EmailService } from '../../../services/email/email.service';
import { CandidateCategory, ContactSpoc } from 'src/app/prodapt-india/services/landing-page/landing-page.service';
import { LocalMessage, MessagingService } from '../../../services/messaging/messaging.service';

export interface UpdatePasswordDetails {
  newPassword: string;
  confirmPassword: string;
}

export interface ApproveCandidateDetails {
  empCode: string;
  prodaptEmail: string;
  approved: boolean;
}

export interface Candidate {
  id?: string;
  email: string;
  name: string;
  empCode?: string;
  prodaptEmail?: string;
  photoImage?: any;
  password?: string;
  dateOfJoining: number;
  highestQualification: string;
  modeOfRecruitment: string;
  consentFormAccepted?: boolean;
  percentProgress?: number;
  declarationsDone?: boolean;
  candidateDetailsDone?: boolean;
  idCardDone?: boolean;
  mediclaimDone?: boolean;
  gratuityDone?: boolean;
  epfkycDone?: boolean;
  epfNominationDone?: boolean;
  bankDetailsDone?: boolean;
  welfareDetailsDone?: boolean;
  hrbpSpoc?: ContactSpoc;
  proAdvisorSpoc?: ContactSpoc;
  category?: string;
  practiceTag?: string;
  department?: String;
  reportingManagerName?: string;
  reportingManageremail?: string;
  status?: string;
  country: string;
  region?: string;
  created?: number;
  modified?: number;
  createdBy?: string;
  modifiedBy?: string;
  role?: string;
  enabled?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  public candidate?: Candidate
  public subject = new Subject<Candidate>();

  get candidateSubject(): Observable<Candidate> {
    return this.subject.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private messagingService: MessagingService,
    private emailService: EmailService,
    private authService: AuthService) { }

  getCandidatesList(): Observable<any> {
    return this.httpClient.get(`${environment.API_ENDPOINT}` + `${environment.GET_ALL_CANDIDATES_URL}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
      })
    });
  }

  getCandidate(empId: string) {
    this.httpClient.get(`${environment.API_ENDPOINT}`
      + `${environment.GET_CANDIDATE_URL}` + empId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
      })
    }).subscribe(
      candidate => {
        this.candidate = candidate as Candidate;
        this.subject.next(this.candidate);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateCandidate(candidate: Candidate) {
    this.httpClient.put(`${environment.API_ENDPOINT}`
      + `${environment.PUT_CANDIDATE_UPDATE_URL}` + candidate.id, candidate, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
      })
    }).subscribe(
      candidate => {
        this.candidate = candidate as Candidate;
        this.subject.next(this.candidate);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateCandidatePassword(candidatePwd: Candidate) {
    this.httpClient.put(`${environment.API_ENDPOINT}`
      + `${environment.CANDIDATE_UPDATE_PASSWORD_URL}`
      + candidatePwd.id,
      candidatePwd, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
      })
    }).subscribe(
      candidate => {
        this.candidate = candidate as Candidate;
        this.subject.next(this.candidate);
        this.messagingService.reportMessage(new LocalMessage('Updated Candidate Password!!!', false));

        let email: Email = {
          toEmail: this.candidate.email,
          subject: 'Updated Candidate Details of ' + this.candidate.name,
          intro: `This message is a password update notification for you to access Pre BAP onboarding portal. Please find below new password to access your account.`,
          body:
            `Details Updated: Username: ${this.candidate.email}, Password: ${candidatePwd.password}. Please feel free to DL-PIHRops@prodapt.com for clarifications if any.`
        }
        this.emailService.sendGeneralEmail(email);
      },
      error => {
        console.log(error);
        if (error.status === 401) {
          this.authService.logout();
          this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
        } else {
          this.messagingService.reportMessage(new LocalMessage('Failed to update Candidate Password', true));
        }
      });
  }
}
