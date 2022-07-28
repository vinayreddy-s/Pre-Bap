import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class LocalMessage {
  constructor(
    public text: string,
    public error: boolean = false,
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  subject = new Subject<LocalMessage>();

  constructor() { }

  reportMessage(msg: LocalMessage) {
    this.subject.next(msg);
  }

  get messages(): Observable<LocalMessage> {
    return this.subject.asObservable();
  }

}
