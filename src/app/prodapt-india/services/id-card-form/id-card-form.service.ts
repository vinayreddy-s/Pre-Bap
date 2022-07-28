import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { LocalMessage, MessagingService } from '../../../services/messaging/messaging.service';

export interface IdCard {
  id?: string;
  empName: string;
  empId: string;
  empCode: string;
  address: string;
  bloodGroup: string;
  mobile: string;
  vehicleDetails?: Vehicle[];
  photoImage: any;
  signImage: any;
  created?: number;
  modified?: number;
  modifiedBy?: string
}

export interface Vehicle {
  id?: string;
  type: string;
  make: string;
  model: string;
  regnNo: string;
}


@Injectable({
  providedIn: 'root'
})
export class IdCardFormService {

  public idCard?: IdCard;
  public $idSubject = new Subject<IdCard>();

  constructor(
    private httpClient: HttpClient,
    private messagingService: MessagingService,
    private authService: AuthService,
  ) { }

  get $idCardSubject(): Observable<IdCard> {
    return this.$idSubject.asObservable();
  }

  getIdCard(empId: string) {
    this.httpClient.get(`${environment.API_ENDPOINT}` + `${environment.IDCARD_GET_BASIC_URL}`
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
        this.idCard = data as IdCard;
        this.$idSubject.next(this.idCard);
      },
      error => {
        console.log(error);
      }
    );
  }

  saveIdCard(idCardDetails: IdCard) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.IDCARD_DETAILS_POST_URL}`,
      idCardDetails,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.idCard = data as IdCard;
          this.$idSubject.next(this.idCard);
          this.messagingService.reportMessage(new LocalMessage('Saved IdCard Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save IdCard Details!!!', true));
          }
        }
      );
  }

  updateIdCard(idCardDetails: IdCard) {
    this.httpClient.put(`${environment.API_ENDPOINT}` + `${environment.IDCARD_DETAILS_PUT_URL}`
      + idCardDetails.id, idCardDetails,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.idCard = data as IdCard;
          this.$idSubject.next(this.idCard);
          this.messagingService.reportMessage(new LocalMessage('Updated IdCard Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to update IdCard Details!!!', true));
          }
        }
      );
  }

  saveVehicle(vehicle: Vehicle) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.VEHICLE_BASE_URL}`
      + this.idCard?.id + `${environment.VEHICLE_POST_URL}`, vehicle,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.idCard = data as IdCard;
          this.$idSubject.next(this.idCard);
          this.messagingService.reportMessage(new LocalMessage('Saved Vehicle Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Vehicle Details!!!', true));
          }
        }
      );
  }

  deleteVehicle(vehicleId: string) {
    this.httpClient.delete(`${environment.API_ENDPOINT}`
      + `${environment.VEHICLE_BASE_URL}`
      + this.idCard?.id
      + `${environment.VEHICLE_DELETE_URL}` + vehicleId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.idCard = data as IdCard;
          this.$idSubject.next(this.idCard);
          this.messagingService.reportMessage(new LocalMessage('Deleted Vehicle Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to delete Vehicle Details!!!', true));
          }
        }
      );
  }

}


