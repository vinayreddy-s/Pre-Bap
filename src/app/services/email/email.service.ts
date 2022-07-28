import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalMessage, MessagingService } from '../messaging/messaging.service';

export interface Email {
  toEmail: string;
  subject: string;
  intro?: string;
  body: string;
  attachmentUrl?: any;
  attachmentName?: string;
  attachementType?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private httpClient: HttpClient,
    private messagingService: MessagingService
  ) {

  }

  sendSimpleEmail(email: Email) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.EMAIL_SIMPLE_URL}`, email, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
      })
    }).subscribe(
      body => {
        this.messagingService.reportMessage(new LocalMessage('Email Sent...', false));
      },
      error => {
        console.log(error);
        this.messagingService.reportMessage(new LocalMessage('Email Sending Failed...', true));
      }
    );
  }

  sendEmailWithAttachement(email: Email) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.EMAIL_WITH_ATTACHMENT_URL}`, email, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
      })
    }).subscribe(
      body => {
        this.messagingService.reportMessage(new LocalMessage('Email Sent with attachement...', false));
      },
      error => {
        console.log(error);
        this.messagingService.reportMessage(new LocalMessage('Email Sending Failed...', true));
      }
    );
  }

  sendGeneralEmail(email: Email) {
    this.httpClient.post(`${environment.API_ENDPOINT}` + `${environment.EMAIL_GENERAL_URL}`, email, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
      })
    }).subscribe(
      body => {
        this.messagingService.reportMessage(new LocalMessage('Email Sent...', false));
      },
      error => {
        console.log(error);
        this.messagingService.reportMessage(new LocalMessage('Email Sending Failed...', true));
      }
    );
  }

}
