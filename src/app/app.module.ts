import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AppComponent } from './app.component';
import { ConsentDialogComponent } from './prodapt-india/components/dialogs/consent-dialog/consent-dialog.component';
import { DeleteDialogComponent } from './prodapt-india/components/dialogs/delete-dialog/delete-dialog.component';
import { GuardDialogComponent } from './prodapt-india/components/dialogs/guard-dialog/guard-dialog.component';
import { UpdatePasswordDialogComponent } from './prodapt-india/components/dialogs/update-password-dialog/update-password-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { MaterialModule } from './angular-material/material.module';
import { ProdaptIndiaModule } from './prodapt-india/prodapt-india.module';
import { AppRoutingModule } from './routing/app-routing.module';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [
    AppComponent,
    MessagingComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    Ng2TelInputModule,
    NgxIntlTelInputModule,
    ProdaptIndiaModule,
  ],
  providers: [
    NgxImageCompressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
