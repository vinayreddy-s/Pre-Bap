import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LocalMessage, MessagingService } from 'src/app/services/messaging/messaging.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

export interface WelfareFund {
  id?: string;
  empId: string;
  empName: string;
  welfareFundAmount: string;
  dateOfJoining: number;
  empCode?: string;
  prodaptEmail?: string;
  signImage: any;
  signDate: number;
  createdOn?: number;
  modifiedOn?: number;
}

@Injectable({
  providedIn: 'root'
})
export class WelfareFundService {

  public welfareFund?: WelfareFund;
  public welfareFundsubject = new Subject<WelfareFund>();

  constructor(
    private httpClient: HttpClient,
    private messagingService: MessagingService,
    private authService: AuthService) { }

  get $welfareDetails(): Observable<WelfareFund> {
    return this.welfareFundsubject.asObservable();
  }

  async getWelfareFundDetails(empId: string) {
    this.httpClient.get(`${environment.API_ENDPOINT}` + `${environment.WELFARE_FUND_DETAILS_GET_URL}`
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
        this.welfareFund = data as WelfareFund;
        this.welfareFundsubject.next(this.welfareFund);
      },
      error => {
        console.log(error);
      }
    );
  }

  saveWelfareFundDetails(welfareFund: WelfareFund) {
    welfareFund.dateOfJoining = new Date(welfareFund.dateOfJoining!).getTime();
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.WELFARE_FUND_DETAILS_POST_URL}`,
      welfareFund,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.welfareFund = data as WelfareFund;
          this.welfareFundsubject.next(this.welfareFund);
          this.messagingService.reportMessage(new LocalMessage('Saved Welfare Fund Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Welfare Fund Details!!!', true));
          }
        }
      );
  }

  updateWelfareFundDetails(welfareFund: WelfareFund) {
    welfareFund.dateOfJoining = new Date(welfareFund.dateOfJoining).getTime();

    this.httpClient.put(`${environment.API_ENDPOINT}` + `${environment.WELFARE_FUND_DETAILS_PUT_URL}`
      + welfareFund.id, welfareFund,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.welfareFund = data as WelfareFund;
          this.welfareFundsubject.next(this.welfareFund);
          this.messagingService.reportMessage(new LocalMessage('Updated Welfare Fund Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to update Welfare Fund Details!!!', true));
          }
        }
      );
  }
}
