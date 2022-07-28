import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalMessage, MessagingService } from '../../../services/messaging/messaging.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Observable, Subject } from 'rxjs';

export interface Declarations {
  id?: string;
  empId: string;
  empName: string;
  email: string;
  documentsList?: Document[];
}

export interface Document {
  id?: string;
  docName: string;
  docDesc: string;
  signImage: any;
  signDate: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeclarationsService {

  public declarations?: Declarations;
  public $decSubject = new Subject<Declarations>();

  constructor(private httpClient: HttpClient,
    private messagingService: MessagingService,
    private authService: AuthService) { }

    get $declarationsSubject(): Observable<Declarations> {
      return this.$decSubject.asObservable();
    }

  getDeclarations(empId: string) {
    this.httpClient.get(`${environment.API_ENDPOINT}` + `${environment.DECLARATIONS_GET_BY_EMPID_URL}` + `${empId}`,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }
    ).subscribe(
      data => {
        this.declarations = data as Declarations;
        this.$decSubject.next(this.declarations);
      },
      error => {
        console.log(error);
        if (error.status === 401) {
          this.authService.logout();
          this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
        } else {
          this.messagingService.reportMessage(new LocalMessage('Failed to get Declarations Details!!!', true));
        }
      }
    );
  }

  saveDeclarations(declarations: Declarations) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.DECLARATIONS_POST_URL}`,
      declarations,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.declarations = data as Declarations;
          this.$decSubject.next(this.declarations);
          this.messagingService.reportMessage(new LocalMessage('Declarations - Candidate Basic Details Saved!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to save Declarations!!!', true));
          }
        }
      );
  }

  updateDeclarations(declarations: Declarations) {
    this.httpClient.put(`${environment.API_ENDPOINT}` + `${environment.DECLARATIONS_PUT_URL}`
      + `${declarations.id}`,
      declarations,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.declarations = data as Declarations;
          this.$decSubject.next(this.declarations);
          this.messagingService.reportMessage(new LocalMessage('Updated Declarations!!!', false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage('Failed to update Declarations!!!', true));
          }
        }
      );
  }

  saveDocument(document: Document) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.DECLARATIONS_BASE_URL}`
      + `${this.declarations?.id}` + `${environment.DOCUMENTS_POST_URL}`,
      document,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.declarations = data as Declarations;
          this.$decSubject.next(this.declarations);
          this.messagingService.reportMessage(new LocalMessage(`${document.docName} Saved!!!`, false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage(`Failed to save ${document.docName}!!!`, true));
          }
        }
      );
  }

  updateDocument(document: Document) {
    this.httpClient.put(`${environment.API_ENDPOINT}` + `${environment.DECLARATIONS_BASE_URL}`
      + `${this.declarations?.id}` + `${environment.DOCUMENTS_PUT_URL}` + `${document.id}`,
      document,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.declarations = data as Declarations;
          this.$decSubject.next(this.declarations);
          this.messagingService.reportMessage(new LocalMessage(`Updated ${document.docName}!!!`, false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage(`Failed to update ${document.docName}!!!`, true));
          }
        }
      );
  }

  deleteDocument(document: Document) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.DECLARATIONS_BASE_URL}`
      + `${this.declarations?.id}` + `${environment.DOCUMENTS_DELETE_URL}` + `${document.id}`,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }).subscribe(
        data => {
          this.declarations = data as Declarations;
          this.$decSubject.next(this.declarations);
          this.messagingService.reportMessage(new LocalMessage(`${document.docName} deleted!!!`, false));
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logout();
            this.messagingService.reportMessage(new LocalMessage('Session expired!!!', true));
          } else {
            this.messagingService.reportMessage(new LocalMessage(`Failed to delete ${document.docName}!!!`, true));
          }
        }
      );
  }

}
