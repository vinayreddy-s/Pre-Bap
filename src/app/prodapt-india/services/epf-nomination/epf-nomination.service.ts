import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { LocalMessage, MessagingService } from '../../../services/messaging/messaging.service';

export interface EPFNomination {
  id?: string;
  empId: string;
  empName: string;
  dateOfBirth: number,
  gender: string;
  maritialStatus: string;
  accountNumber: string;
  empFatherOrSpouseName: string;
  dateOfJoining: number;
  permanentAddress: string;
  presentAddress: string;
  epfNomineeSign: any;
  epsNomineeSign: any;
  epsNomineeDate: number;

  epfNomineeList: EPFNominee[];
  epsFamilyList: EPSFamily[];
  nomineeList: EPFNominee[];

  createdOn?: number;
  modifiedOn?: number;
  modifiedBy?: string
}

export interface EPFNominee {
  id?: string;
  name: string;
  relationship: string;
  dateOfBirth: number;
  proportion?: number;
  address: string;
  minorDetails?: string;
}

export interface EPSFamily {
  id?: string;
  name: string;
  relationship: string;
  dateOfBirth: number;
  address: string;
}
@Injectable({
  providedIn: 'root'
})
export class EpfNominationService {

  public epfNomination?: EPFNomination;
  public nominationsubject = new Subject<EPFNomination>();

  constructor(
    private httpClient: HttpClient,
    private messagingService: MessagingService,
    private authService: AuthService,
  ) { }

  get epfNominationSubject(): Observable<EPFNomination> {
    return this.nominationsubject.asObservable();
  }

  getEPFNominationForm(empId: string) {
    this.httpClient.get(`${environment.API_ENDPOINT}` + `${environment.EPF_NOMINATION_GET_BASIC_URL}`
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
        this.epfNomination = data as EPFNomination;
        this.nominationsubject.next(this.epfNomination);
      },
      error => {
        console.log(error);
      }
    );
  }

  saveEPFNominationForm(epfnomiationDetails: EPFNomination) {

    epfnomiationDetails.dateOfBirth = new Date(epfnomiationDetails.dateOfBirth).getTime();
    epfnomiationDetails.dateOfJoining = new Date(epfnomiationDetails.dateOfJoining).getTime();

    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.EPF_NOMINATION_DETAILS_POST_URL}`,
      epfnomiationDetails,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.epfNomination = data as EPFNomination;
          this.nominationsubject.next(this.epfNomination);
          this.messagingService.reportMessage(new LocalMessage('Saved Nomination Form Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Nomination Form Details!!!', true));
          }
        }
      );
  }

  updateEPFNominationForm(epfnomiationDetails: EPFNomination) {
    epfnomiationDetails.dateOfBirth = new Date(epfnomiationDetails.dateOfBirth).getTime();
    epfnomiationDetails.dateOfJoining = new Date(epfnomiationDetails.dateOfJoining).getTime();

    this.httpClient.put(`${environment.API_ENDPOINT}` + `${environment.EPF_NOMINATION_DETAILS_PUT_URL}`
      + epfnomiationDetails.id, epfnomiationDetails,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.epfNomination = data as EPFNomination;
          this.nominationsubject.next(this.epfNomination);
          this.messagingService.reportMessage(new LocalMessage('Updated Gratuity Form Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to update Gratuity Form Details!!!', true));
          }
        }
      );
  }

  saveEPFNominee(nominee: EPFNominee) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.EPF_NOMINATION_BASE_URL}`
      + this.epfNomination?.id + `${environment.EPF_NOMINATION_NOMINEE_POST_URL}`, nominee,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.epfNomination = data as EPFNomination;
          this.nominationsubject.next(this.epfNomination);
          this.messagingService.reportMessage(new LocalMessage('Saved Nominee Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Nominee Details!!!', true));
          }
        }
      );
  }

  deleteEPFNominee(nomineeId: string) {
    this.httpClient.delete(`${environment.API_ENDPOINT}`
      + `${environment.EPF_NOMINATION_BASE_URL}`
      + this.epfNomination?.id
      + `${environment.EPF_NOMINATION_NOMINEE_DELETE_URL}` + nomineeId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.epfNomination = data as EPFNomination;
          this.nominationsubject.next(this.epfNomination);
          this.messagingService.reportMessage(new LocalMessage('Deleted Nominee Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to delete Nominee Details!!!', true));
          }
        }
      );
  }


  saveEPSFamily(epsFamily: EPSFamily) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.EPF_NOMINATION_BASE_URL}`
      + this.epfNomination?.id + `${environment.EPF_NOMINATION_FAMILY_POST_URL}`, epsFamily,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.epfNomination = data as EPFNomination;
          this.nominationsubject.next(this.epfNomination);
          this.messagingService.reportMessage(new LocalMessage('Saved EPS Family Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save EPS Family Details!!!', true));
          }
        }
      );
  }

  deleteEPSFamily(epsFamilyId: string) {
    this.httpClient.delete(`${environment.API_ENDPOINT}`
      + `${environment.EPF_NOMINATION_BASE_URL}`
      + this.epfNomination?.id
      + `${environment.EPF_NOMINATION_FAMILY_DELETE_URL}` + epsFamilyId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.epfNomination = data as EPFNomination;
          this.nominationsubject.next(this.epfNomination);
          this.messagingService.reportMessage(new LocalMessage('Deleted EPS Family Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to delete EPS Family Details!!!', true));
          }
        }
      );
  }

  saveEPFSecNominee(nominee: EPFNominee) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.EPF_NOMINATION_BASE_URL}`
      + this.epfNomination?.id + `${environment.EPF_NOMINATION_SEC_NOMINEE_POST_URL}`, nominee,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.epfNomination = data as EPFNomination;
          this.nominationsubject.next(this.epfNomination);
          this.messagingService.reportMessage(new LocalMessage('Saved Nominee Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Nominee Details!!!', true));
          }
        }
      );
  }

  deleteEPFSecNominee(nomineeId: string) {
    this.httpClient.delete(`${environment.API_ENDPOINT}`
      + `${environment.EPF_NOMINATION_BASE_URL}`
      + this.epfNomination?.id
      + `${environment.EPF_NOMINATION_SEC_NOMINEE_DELETE_URL}` + nomineeId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.epfNomination = data as EPFNomination;
          this.nominationsubject.next(this.epfNomination);
          this.messagingService.reportMessage(new LocalMessage('Deleted Nominee Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to delete Nominee Details!!!', true));
          }
        }
      );
  }
}
