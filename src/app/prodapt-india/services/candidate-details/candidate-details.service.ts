import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { LocalMessage, MessagingService } from '../../../services/messaging/messaging.service';

export interface CandidateDetails {
  id?: string;
  empId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: number;
  maritalStatus: string;
  mobileNumber: string;
  email: string;
  gender: string;

  bloodGroup: string;
  nationality: string;
  dateOfJoining: number;
  fatherOrSpouseName: string;
  emgContactName: string;
  emgContactRelation: string;
  emgContactEmail: string;
  emgContactMobile: string;
  socialMediLink: string;
  uan: string;

  addressList?: Address[];
  identityList?: Identity[];
  languageList?: Language[];
  refPersonList?: RefPerson[];
  educationList?: Education[];
  specializationList?: Specialization[];
  workList?: Work[];
  travelList?: Travel[];

  created?: number;
  modified?: number;
  modifiedBy?: string
}

export interface Address {
  id?: string;
  type: string;
  country: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  zipOrPostalCode: string;
}

export interface Identity {
  id?: string;
  docName: string;
  docNumber: string;
  nameInDoc: number;
  docIssuedCountry: string;
  docValidFrom: number;
  docValidTo: number;
  identityImage?: any;
  fileType?: string;
  approved?: boolean;
  approvedBy?: string;
  approvedOn?: number;
  remarks?: string;
}

export interface Language {
  id?: string;
  name: string;
  read: boolean;
  write: boolean;
  speak: boolean;
}

export interface RefPerson {
  id?: string;
  name: string;
  designation: string;
  mobileNumber: string;
  address: string;
}

export interface Education {
  id?: string;
  educationName: string;
  institution: string;
  boardOrUniversity: string;
  studiedFrom: number;
  studiedTo: number;
  specialization : string;
  educationImage?: any;
  fileType?: string;
  educationImage1?: any;
  fileType1?: string;
  educationImage2?: any;
  fileType2?: string;
  approved?: boolean;
  approvedBy?: string;
  approvedOn?: number;
  remarks?: string;
}

export interface Specialization {
  id?: string;
  name: string;
  details: string;
  dateOfCompletion: number;
  specializationImage?: any;
  fileType?: string;
  approved?: boolean;
  approvedBy?: string;
  approvedOn?: number;
  remarks?: string;
}

export interface Work {
  id?: string;
  companyName: string;
  designation: string;
  workedFrom: number;
  workedTo: number;
  industryType: string;
  organizationType: string;
  workImage?: any;
  fileType?: string;
  workImage1?: any;
  fileType1?: string;
  approved?: boolean;
  approvedBy?: string;
  approvedOn?: number;
  remarks?: string;
}

export interface Travel {
  id?: string;
  countryVisited: string;
  stayedFrom: number;
  stayedTo: number;
  travelType: string;
  visaIssuedEmbassy: string;
  visaType: string;
}

@Injectable({
  providedIn: 'root'
})
export class CandidateDetailsService {

  public candidateDetails?: CandidateDetails;
  public cdSubject = new Subject<CandidateDetails>();

  constructor(
    private httpClient: HttpClient,
    private messagingService: MessagingService,
    private authService: AuthService,
  ) { }

  get candidateDetailsSubject(): Observable<CandidateDetails> {
    return this.cdSubject.asObservable();
  }

  getCandidateDetailsForm(empId: string) {

    this.httpClient.get(`${environment.API_ENDPOINT}` + `${environment.CANDIDATE_DETAILS_GET_BASIC_URL}`
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
        this.candidateDetails = data as CandidateDetails;
        this.cdSubject.next(this.candidateDetails);
      },
      error => {
        console.log(error);
        if (error.status === 401) {
          this.authService.logout();
          this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
        } else {
          this.messagingService.reportMessage(new LocalMessage('Failed to get Candidate Details!!!', true));
        }
      }
    );
  }

  saveCandidateDetails(candidateDetails: CandidateDetails) {

    candidateDetails.dateOfBirth = new Date(candidateDetails.dateOfBirth).getTime();
    candidateDetails.dateOfJoining = new Date(candidateDetails.dateOfJoining).getTime();

    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.CANDIDATE_DETAILS_POST_URL}`,
      candidateDetails,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Saved Candidate Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Candidate Details!!!', true));
          }
        }
      );
  }

  updateCandidateDetails(candidateDetails: CandidateDetails) {

    candidateDetails.dateOfBirth = new Date(candidateDetails.dateOfBirth).getTime();
    candidateDetails.dateOfJoining = new Date(candidateDetails.dateOfJoining).getTime();

    this.httpClient.put(`${environment.API_ENDPOINT}` + `${environment.CANDIDATE_DETAILS_PUT_URL}`
      + candidateDetails.id, candidateDetails,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Updated Candidate Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to update Candidate Details!!!', true));
          }
        }
      );
  }

  saveAddressDetails(address: Address) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id + `${environment.ADDRESS_DETAILS_POST_URL}`, address,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Saved Address Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Address Details!!!', true));
          }
        }
      );
  }

  deleteAddressDetails(addressId: string) {
    this.httpClient.delete(`${environment.API_ENDPOINT}`
      + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id
      + `${environment.ADDRESS_DETAILS_DELETE_URL}` + addressId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Deleted Address Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to delete Address Details!!!', true));
          }
        }
      );
  }

  saveIdentityDetails(identity: Identity) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id + `${environment.IDENTITY_DETAILS_POST_URL}`, identity,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Saved Identity Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Identity Details!!!', true));
          }
        }
      );
  }

  deleteIdentityDetails(identityId: string) {
    this.httpClient.delete(`${environment.API_ENDPOINT}`
      + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id
      + `${environment.IDENTITY_DETAILS_DELETE_URL}` + identityId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Deleted Identity Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to delete Identity Details!!!', true));
          }
        }
      );
  }

  saveLanguage(language: Language) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id + `${environment.LANGUAGE_POST_URL}`, language,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Saved Language Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Language Details!!!', true));
          }
        }
      );
  }

  deleteLanguage(langId: string) {
    this.httpClient.delete(`${environment.API_ENDPOINT}`
      + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id
      + `${environment.LANGUAGE_DELETE_URL}` + langId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Deleted Language Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to delete Language Details!!!', true));
          }
        }
      );
  }

  saveReferencePerson(refPerson: RefPerson) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id + `${environment.REF_PERSON_POST_URL}`, refPerson,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Saved Reference Person Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Reference Person Details!!!', true));
          }
        }
      );
  }

  deleteReferencePerson(refId: string) {
    this.httpClient.delete(`${environment.API_ENDPOINT}`
      + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id
      + `${environment.REF_PERSON_DELETE_URL}` + refId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Deleted Reference Person Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to delete Reference Person Details!!!', true));
          }
        }
      );
  }

  saveEducationDetails(education: Education) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id + `${environment.EDUCATION_DETAILS_POST_URL}`, education,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Saved Education Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Education Details!!!', true));
          }
        }
      );
  }

  deleteEducationDetails(educationId: string) {
    this.httpClient.delete(`${environment.API_ENDPOINT}`
      + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id
      + `${environment.EDUCATION_DETAILS_DELETE_URL}` + educationId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Deleted Education Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to delete Education Details!!!', true));
          }
        }
      );
  }

  saveSpecialization(spec: Specialization) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id + `${environment.SPEC_TRAINING_POST_URL}`, spec,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Saved Specialization Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Specialization Details!!!', true));
          }
        }
      );
  }

  deleteSpecialization(specId: string) {
    this.httpClient.delete(`${environment.API_ENDPOINT}`
      + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id
      + `${environment.SPEC_TRAINING_DELETE_URL}` + specId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Deleted Specialization Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to delete Specialization Details!!!', true));
          }
        }
      );
  }

  saveExperienceDetails(work: Work) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id + `${environment.EXPERIENCE_DETAILS_POST_URL}`, work,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Saved Experience Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Experience Details!!!', true));
          }
        }
      );
  }

  deleteExperienceDetails(workId: string) {
    this.httpClient.delete(`${environment.API_ENDPOINT}`
      + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id
      + `${environment.EXPERIENCE_DETAILS_DELETE_URL}` + workId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Deleted Experience Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to delete Experience Details!!!', true));
          }
        }
      );
  }

  saveTravelDetails(travel: Travel) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id + `${environment.TRAVEL_DETAILS_POST_URL}`, travel,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Saved Travel Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Travel Details!!!', true));
          }
        }
      );
  }

  deleteTravelDetails(travelId: string) {
    this.httpClient.delete(`${environment.API_ENDPOINT}`
      + `${environment.CANDIDATE_DETAILS_BASE_URL}`
      + this.candidateDetails?.id
      + `${environment.TRAVEL_DETAILSS_DELETE_URL}` + travelId,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.candidateDetails = data as CandidateDetails;
          this.cdSubject.next(this.candidateDetails);
          this.messagingService.reportMessage(new LocalMessage('Deleted Travel Details!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to delete Travel Details!!!', true));
          }
        }
      );
  }

}
