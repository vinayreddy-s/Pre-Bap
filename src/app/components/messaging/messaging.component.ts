import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalMessage, MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {

  lastMessage?: LocalMessage;

  constructor(private messagingService: MessagingService, private matSnackBar: MatSnackBar) {
    this.messagingService.messages.subscribe((msg) => {

      if (msg.error) {
        this.matSnackBar.open(msg.text, '', {
          duration: 3000,
          panelClass: ['style-error']
        });
      } else {
        this.matSnackBar.open(msg.text, '', {
          duration: 3000,
          panelClass: ['style-success']
        });
      }
    })
  }

  ngOnInit(): void {
  }

}
