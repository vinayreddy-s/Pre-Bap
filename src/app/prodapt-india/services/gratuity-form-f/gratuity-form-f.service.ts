import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { LocalMessage, MessagingService } from '../../../services/messaging/messaging.service';

export interface Gratuity {
  id?: string;
  empId: string;
  empName: string;
  companyAddress: string;

  nomineeList: GratuityNominee[];

  gender: string;
  religion: string;
  maritialStatus: string;
  empDept: string;
  dateOfAppointment: number;
  empTicketOrSerialNo: string;
  empVillage: string;
  empThana: string;
  empSubDivision: string;
  empPostOffice: string;
  empDistrict: string;
  empState: string;
  empAddress: string;
  dateOn: number;
  placeOn: string;
  formfSignImage?: any;

  ackDate?: number;
  ackSignImage?: any;

  witnessPlace: string;
  witnessName: string;
  witnessAddress: string;
  witnessDate: number;

  createdOn?: number;
  modifiedOn?: number;
  modifiedBy?: string
}

export interface GratuityNominee {
  id?: string;
  name: string;
  relationship: string;
  proportion: number;
  age: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class GratuityFormFService {

  public gratuity?: Gratuity;
  public formfsubject = new Subject<Gratuity>();

  constructor(
    private httpClient: HttpClient,
    private messagingService: MessagingService,
    private authService: AuthService,
  ) { }

  get gratuitySubject(): Observable<Gratuity> {
    return this.formfsubject.asObservable();
  }

  getGratuityForm(empId: string) {
    this.httpClient.get(`${environment.API_ENDPOINT}` + `${environment.GRATUITY_GET_BASIC_URL}`
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
        this.gratuity = data as Gratuity;
        this.formfsubject.next(this.gratuity);
      },
      error => {
        console.log(error);
      }
    );
  }

  saveGratuityForm(gratuityForm: Gratuity) {

    gratuityForm.dateOfAppointment = new Date(gratuityForm.dateOfAppointment).getTime();
    gratuityForm.dateOn = new Date(gratuityForm.dateOn).getTime();
    gratuityForm.witnessDate = new Date(gratuityForm.witnessDate).getTime();

    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.GRATUITY_DETAILS_POST_URL}`,
      gratuityForm,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.gratuity = data as Gratuity;
          this.formfsubject.next(this.gratuity);
          this.messagingService.reportMessage(new LocalMessage('Saved Gratuity Form Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Gratuity Form Details!!!', true));
          }
        }
      );
  }

  updateGratuityForm(gratuityForm: Gratuity) {
    gratuityForm.dateOfAppointment = new Date(gratuityForm.dateOfAppointment).getTime();
    gratuityForm.dateOn = new Date(gratuityForm.dateOn).getTime();
    gratuityForm.witnessDate = new Date(gratuityForm.witnessDate).getTime();

    this.httpClient.put(`${environment.API_ENDPOINT}` + `${environment.GRATUITY_DETAILS_PUT_URL}`
      + gratuityForm.id, gratuityForm,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.gratuity = data as Gratuity;
          this.formfsubject.next(this.gratuity);
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

  saveGratuityNominee(nominee: GratuityNominee) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.GRATUITY_DETAILS_BASE_URL}`
      + this.gratuity?.id + `${environment.GRATUITY_NOMINEE_POST_URL}`, nominee,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.gratuity = data as Gratuity;
          this.formfsubject.next(this.gratuity);
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

  deleteGratuityNominee(nomineeId: string) {
    this.httpClient.delete(`${environment.API_ENDPOINT}`
      + `${environment.GRATUITY_DETAILS_BASE_URL}`
      + this.gratuity?.id
      + `${environment.GRATUITY_NOMINEE_DELETE_URL}` + nomineeId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.gratuity = data as Gratuity;
          this.formfsubject.next(this.gratuity);
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
