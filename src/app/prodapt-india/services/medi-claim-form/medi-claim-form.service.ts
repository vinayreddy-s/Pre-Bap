import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { LocalMessage, MessagingService } from '../../../services/messaging/messaging.service';

export interface Mediclaim {
  id?: string;
  name: string;
  empId: string;
  empCode: string;
  gender: string;
  dateOfJoining: number;
  dateOfBirth: number;
  covidVaccination: string;
  relationList: Relation[];
  created?: number;
  modified?: number;
  modifiedBy?: string;
}

export interface Relation {
  id?: string;
  name: string;
  type: string;
  gender: string;
  dateOfBirth: number;
  isDependant: string;
}

@Injectable({
  providedIn: 'root'
})
export class MediclaimFormService {

  mediclaim?: Mediclaim;
  public medisubject = new Subject<Mediclaim>()

  get mediclaimSubject(): Observable<Mediclaim> {
    return this.medisubject.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private messagingService: MessagingService,
    private authService: AuthService,
  ) { }

  getMediclaimInfo(empId: string) {
    this.httpClient.get(`${environment.API_ENDPOINT}` + `${environment.MC_GET_BASIC_URL}`
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
        this.mediclaim = data as Mediclaim;
        this.medisubject.next(this.mediclaim);
      },
      error => {
        console.log(error);
      }
    );
  }

  saveMediclaimInfo(mediclaim: Mediclaim) {

    mediclaim.dateOfBirth = new Date(mediclaim.dateOfBirth).getTime();
    mediclaim.dateOfJoining = new Date(mediclaim.dateOfJoining).getTime();

    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.MC_DETAILS_POST_URL}`, mediclaim,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.mediclaim = data as Mediclaim;
          this.medisubject.next(this.mediclaim);
          this.messagingService.reportMessage(new LocalMessage('Saved Mediclaim Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Mediclaim Details!!!', true));
          }
        }
      );
  }

  updateMediclaimInfo(mediclaim: Mediclaim) {
    mediclaim.dateOfBirth = new Date(mediclaim.dateOfBirth).getTime();
    mediclaim.dateOfJoining = new Date(mediclaim.dateOfJoining).getTime();
    return this.httpClient.put(`${environment.API_ENDPOINT}` + `${environment.MC_DETAILS_PUT_URL}` + mediclaim.id, mediclaim,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.mediclaim = data as Mediclaim;
          this.medisubject.next(this.mediclaim);
          this.messagingService.reportMessage(new LocalMessage('Updated Mediclaim Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to update Mediclaim Details!!!', true));
          }
        }
      );
  }


  saveRelationInfo(relation: Relation) {
    this.httpClient.post(`${environment.API_ENDPOINT}`
      + `${environment.REL_BASE_URL}`
      + this.mediclaim?.id
      + `${environment.REL_POST_URL}`, relation,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.mediclaim = data as Mediclaim;
          this.medisubject.next(this.mediclaim);
          this.messagingService.reportMessage(new LocalMessage('Saved Relation Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Relation Details!!!', true));
          }
        }
      );
  }

  deleteRelationInfo(relationId: string) {
    this.httpClient.delete(`${environment.API_ENDPOINT}` + `${environment.REL_BASE_URL}` +
      this.mediclaim?.id + `${environment.REL_DELETE_URL}` + relationId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.mediclaim = data as Mediclaim;
          this.medisubject.next(this.mediclaim);
          this.messagingService.reportMessage(new LocalMessage('Deleted Relation Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to delete Relation Details!!!', true));
          }
        }
      );
  }

}
