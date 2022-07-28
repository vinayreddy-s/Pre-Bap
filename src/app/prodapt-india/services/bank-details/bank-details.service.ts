import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { LocalMessage, MessagingService } from '../../../services/messaging/messaging.service';

export interface BankDetails {
  id?: string;
  empName: string;
  empId: string;
  empCode: string;
  dateOfJoining: number;
  bankName: string;
  branchName: string;
  accountNumber: string;
  ifscCode: string;
  docType: string;
  docImageUrl: any;
  urlType?: string;
  approved?: boolean;
  approvedBy?: string;
  remarks?: string;
  createdOn?: number;
  modifiedOn?: number;
}


@Injectable({
  providedIn: 'root'
})
export class BankDetailsService {

  public bankDetails?: BankDetails;
  public banksubject = new Subject<BankDetails>();

  constructor(
    private httpClient: HttpClient,
    private messagingService: MessagingService,
    private authService: AuthService,
  ) { }

  get bankDetailsSubject(): Observable<BankDetails> {
    return this.banksubject.asObservable();
  }

  getBankDetails(empId: string) {
    this.httpClient.get(`${environment.API_ENDPOINT}` + `${environment.BANK_DETAILS_GET_URL}`
      + empId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }
    ).subscribe(
      data => {
        this.bankDetails = data as BankDetails;
        this.banksubject.next(this.bankDetails);
      },
      error => {
        console.log(error);
        this.messagingService.reportMessage(new LocalMessage('Failed to get Bank Details!!!', true));
      }
    );
  }

  savebankDetails(bankDetails: BankDetails) {
    bankDetails.dateOfJoining = new Date(bankDetails.dateOfJoining).getTime();

    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.BANK_DETAILS_POST_URL}`,
      bankDetails,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.bankDetails = data as BankDetails;
          this.banksubject.next(this.bankDetails);
          this.messagingService.reportMessage(new LocalMessage('Saved Bank Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Bank Details!!!', true));
          }
        }
      );
  }

  updatebankDetails(bankDetails: BankDetails) {
    bankDetails.dateOfJoining = new Date(bankDetails.dateOfJoining).getTime();
    this.httpClient.put(`${environment.API_ENDPOINT}` + `${environment.BANK_DETAILS_PUT_URL}`
      + bankDetails.id, bankDetails,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.bankDetails = data as BankDetails;
          this.banksubject.next(this.bankDetails);
          this.messagingService.reportMessage(new LocalMessage('Updated Bank Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to update Bank Details!!!', true));
          }
        }
      );
  }
}
