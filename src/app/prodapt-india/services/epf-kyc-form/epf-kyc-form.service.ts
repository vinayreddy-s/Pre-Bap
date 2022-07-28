import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { LocalMessage, MessagingService } from '../../../services/messaging/messaging.service';

export interface EPFKYCDetails {
  id?: string;
  empId: string;
  name: string;
  mobile: string;
  dateOfBirth: number;
  dateOfJoining: number;
  email: string;
  gender: string;
  fatherOrSpouseName: string;
  relationship: string;
  memberOfEPF: string;
  memberOfEPS: string;

  uan: string;
  regionCode: string;
  officeCode: string;
  establishmentId: string;
  extension: string;
  accountNumber: string;
  dateOfExit: number;
  dateOfJoiningPrev: number;
  schemeCertificateNumber: string;
  ppoNumber: string;

  isInternationWorker: string;
  countryOforigin: string;
  passportNumber: string;
  validFrom: number;
  validTo: number;
  eduQualifications: string;
  maritialStatus: string;
  speciallyabled: string;
  disabledCategory: string;

  epfEnrolledDate: number;
  epfWages: string;
  epfMember: string;
  epfWithdrawn: string;
  epsWithdrawn: string;
  epsEarned: string;

  kycDetailList: KYCDetail[];
  placeOfConsent: string;
  dateOfConsent: number;
  epfSignImage?: any;

  createdOn?: number;
  modifiedOn?: number;
  modifiedBy?: string;
}

export interface KYCDetail {
  id?: string;
  selectKYC: string;
  nameAsPerDoc: string;
  docNumber: number;
  remarks: string;
}

@Injectable({
  providedIn: 'root'
})
export class EpfKycFormService {

  epfKYCDetails?: EPFKYCDetails;
  public kycsubject = new Subject<EPFKYCDetails>()

  get epfKYCDetailsSubject(): Observable<EPFKYCDetails> {
    return this.kycsubject.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private messagingService: MessagingService,
    private authService: AuthService,
  ) { }

  getepfKYCDetails(empId: string) {
    this.httpClient.get(`${environment.API_ENDPOINT}` + `${environment.EPF_KYC_GET_BASIC_URL}`
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
        this.epfKYCDetails = data as EPFKYCDetails;
        this.kycsubject.next(this.epfKYCDetails);
      },
      error => {
        console.log(error);
      }
    );
  }


  saveepfKYCDetails(epfKYCDetails: EPFKYCDetails) {

    epfKYCDetails.dateOfBirth = new Date(epfKYCDetails.dateOfBirth).getTime();
    epfKYCDetails.dateOfJoining = new Date(epfKYCDetails.dateOfJoining).getTime();
    epfKYCDetails.dateOfExit = new Date(epfKYCDetails.dateOfExit).getTime();
    epfKYCDetails.dateOfJoiningPrev = new Date(epfKYCDetails.dateOfJoiningPrev).getTime();
    epfKYCDetails.validFrom = new Date(epfKYCDetails.validFrom).getTime();
    epfKYCDetails.validTo = new Date(epfKYCDetails.validTo).getTime();
    epfKYCDetails.epfEnrolledDate = new Date(epfKYCDetails.epfEnrolledDate).getTime();
    epfKYCDetails.dateOfConsent = new Date(epfKYCDetails.dateOfConsent).getTime();

    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.EPF_KYC_FORM_POST_URL}`, epfKYCDetails,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.epfKYCDetails = data as EPFKYCDetails;
          this.kycsubject.next(this.epfKYCDetails);
          this.messagingService.reportMessage(new LocalMessage('Saved EPF KYC Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save EPF KYC Details!!!', true));
          }
        }
      );
  }

  updateepfKYCDetails(epfKYCDetails: EPFKYCDetails) {
    epfKYCDetails.dateOfBirth = new Date(epfKYCDetails.dateOfBirth).getTime();
    epfKYCDetails.dateOfJoining = new Date(epfKYCDetails.dateOfJoining).getTime();
    epfKYCDetails.dateOfExit = new Date(epfKYCDetails.dateOfExit).getTime();
    epfKYCDetails.dateOfJoiningPrev = new Date(epfKYCDetails.dateOfJoiningPrev).getTime();
    epfKYCDetails.validFrom = new Date(epfKYCDetails.validFrom).getTime();
    epfKYCDetails.validTo = new Date(epfKYCDetails.validTo).getTime();
    epfKYCDetails.epfEnrolledDate = new Date(epfKYCDetails.epfEnrolledDate).getTime();
    epfKYCDetails.dateOfConsent = new Date(epfKYCDetails.dateOfConsent).getTime();

    return this.httpClient.put(`${environment.API_ENDPOINT}` + `${environment.EPF_KYC_FORM_PUT_URL}`
      + epfKYCDetails.id, epfKYCDetails,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.epfKYCDetails = data as EPFKYCDetails;
          this.kycsubject.next(this.epfKYCDetails);
          this.messagingService.reportMessage(new LocalMessage('Updated EPF KYC Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to update EPF KYC Details!!!', true));
          }
        }
      );
  }


  savekycDetail(kycDetail: KYCDetail) {

    this.httpClient.post(`${environment.API_ENDPOINT}`
      + `${environment.EPF_KYC_FORM_BASE_URL}`
      + this.epfKYCDetails?.id
      + `${environment.KYC_DETAIL_POST_URL}`, kycDetail,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.epfKYCDetails = data as EPFKYCDetails;
          this.kycsubject.next(this.epfKYCDetails);
          this.messagingService.reportMessage(new LocalMessage('Saved KYC Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save KYC Details!!!', true));
          }
        }
      );
  }

  deletekycDetail(kycDetailId: string) {
    this.httpClient.delete(`${environment.API_ENDPOINT}` + `${environment.EPF_KYC_FORM_BASE_URL}` +
      this.epfKYCDetails?.id + `${environment.KYC_DETAIL_DELETE_URL}` + kycDetailId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.epfKYCDetails = data as EPFKYCDetails;
          this.kycsubject.next(this.epfKYCDetails);
          this.messagingService.reportMessage(new LocalMessage('Deleted KYC Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to delete KYC Details!!!', true));
          }
        }
      );
  }
}
