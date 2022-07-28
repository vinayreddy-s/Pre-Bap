import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { NgxSignaturePadModule } from '@o.krucheniuk/ngx-signature-pad';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxPrintModule } from 'ngx-print';
import { CodeOfConductComponent } from '../prodapt-india/components/dashboard/code-of-conduct/code-of-conduct.component';
import { ConsentFormComponent } from '../prodapt-india/components/dashboard/code-of-conduct/consent-form/consent-form.component';
import { LoaDocumentComponent } from '../prodapt-india/components/dashboard/code-of-conduct/loa-document/loa-document.component';
import { NdaDocumentComponent } from '../prodapt-india/components/dashboard/code-of-conduct/nda-document/nda-document.component';
import { BankDeatilsComponent } from '../prodapt-india/components/dashboard/bank-deatils/bank-deatils.component';
import { AddressListComponent } from '../prodapt-india/components/dashboard/company-app-form/address-list/address-list.component';
import { CandidateDetailsComponent } from '../prodapt-india/components/dashboard/company-app-form/candidate-details/candidate-details.component';
import { CompanyAppFormComponent } from '../prodapt-india/components/dashboard/company-app-form/company-app-form.component';
import { EducationDetailsComponent } from '../prodapt-india/components/dashboard/company-app-form/education-details/education-details.component';
import { ExperienceDetailsComponent } from '../prodapt-india/components/dashboard/company-app-form/experience-details/experience-details.component';
import { IdentityListComponent } from '../prodapt-india/components/dashboard/company-app-form/identity-list/identity-list.component';
import { LanguageProficiencyComponent } from '../prodapt-india/components/dashboard/company-app-form/language-proficiency/language-proficiency.component';
import { RefpersonListComponent } from '../prodapt-india/components/dashboard/company-app-form/refperson-list/refperson-list.component';
import { SpecialisedTrainingComponent } from '../prodapt-india/components/dashboard/company-app-form/specialised-training/specialised-training.component';
import { TravelDetailsComponent } from '../prodapt-india/components/dashboard/company-app-form/travel-details/travel-details.component';
import { DashboardComponent } from '../prodapt-india/components/dashboard/dashboard.component';
import { DeclarationFormComponent } from '../prodapt-india/components/dashboard/form-eleven/declaration-form/declaration-form.component';
import { FormElevenComponent } from '../prodapt-india/components/dashboard/form-eleven/form-eleven.component';
import { KycDetailsComponent } from '../prodapt-india/components/dashboard/form-eleven/kyc-details/kyc-details.component';
import { UndertakingDetailsComponent } from '../prodapt-india/components/dashboard/form-eleven/undertaking-details/undertaking-details.component';
import { FormFComponent } from '../prodapt-india/components/dashboard/form-f/form-f.component';
import { FormfIntroComponent } from '../prodapt-india/components/dashboard/form-f/formf-intro/formf-intro.component';
import { NomineeDetailsComponent } from '../prodapt-india/components/dashboard/form-f/nominee-details/nominee-details.component';
import { EpfnomineeDetailsComponent } from '../prodapt-india/components/dashboard/form-two/epfnominee-details/epfnominee-details.component';
import { EpsfamilyDetailsComponent } from '../prodapt-india/components/dashboard/form-two/epsfamily-details/epsfamily-details.component';
import { FormTwoComponent } from '../prodapt-india/components/dashboard/form-two/form-two.component';
import { FormtwonomineeDetailsComponent } from '../prodapt-india/components/dashboard/form-two/formtwonominee-details/formtwonominee-details.component';
import { NominationFormComponent } from '../prodapt-india/components/dashboard/form-two/nomination-form/nomination-form.component';
import { IdCardDetailsComponent } from '../prodapt-india/components/dashboard/id-card-form/id-card-details/id-card-details.component';
import { IdCardFormComponent } from '../prodapt-india/components/dashboard/id-card-form/id-card-form.component';
import { VehicleDetailsComponent } from '../prodapt-india/components/dashboard/id-card-form/vehicle-details/vehicle-details.component';
import { LandingPageComponent } from '../prodapt-india/components/dashboard/landing-page/landing-page.component';
import { MediClaimDetailsComponent } from '../prodapt-india/components/dashboard/medi-claim-form/medi-claim-details/medi-claim-details.component';
import { MediClaimFormComponent } from '../prodapt-india/components/dashboard/medi-claim-form/medi-claim-form.component';
import { MediFamDetailsComponent } from '../prodapt-india/components/dashboard/medi-claim-form/medi-fam-details/medi-fam-details.component';
import { ViewBankDetailsComponent } from '../prodapt-india/components/dashboard/view-bank-details/view-bank-details.component';
import { ViewCandidateDetailsComponent } from '../prodapt-india/components/dashboard/view-company-app-form/view-candidate-details/view-candidate-details.component';
import { ViewCompanyAppFormComponent } from '../prodapt-india/components/dashboard/view-company-app-form/view-company-app-form.component';
import { ViewEducationDocsComponent } from '../prodapt-india/components/dashboard/view-company-app-form/view-education-docs/view-education-docs.component';
import { ViewExperienceDocsComponent } from '../prodapt-india/components/dashboard/view-company-app-form/view-experience-docs/view-experience-docs.component';
import { ViewIdentityDocsComponent } from '../prodapt-india/components/dashboard/view-company-app-form/view-identity-docs/view-identity-docs.component';
import { ViewSpecDocsComponent } from '../prodapt-india/components/dashboard/view-company-app-form/view-spec-docs/view-spec-docs.component';
import { ViewFaqComponent } from '../prodapt-india/components/dashboard/view-faq/view-faq.component';
import { ViewFormElevenComponent } from '../prodapt-india/components/dashboard/view-form-eleven/view-form-eleven.component';
import { ViewFormFComponent } from '../prodapt-india/components/dashboard/view-form-f/view-form-f.component';
import { ViewFormTwoComponent } from '../prodapt-india/components/dashboard/view-form-two/view-form-two.component';
import { ViewIdCardFormComponent } from '../prodapt-india/components/dashboard/view-id-card-form/view-id-card-form.component';
import { ViewMediClaimFormComponent } from '../prodapt-india/components/dashboard/view-medi-claim-form/view-medi-claim-form.component';
import { IntroDialogComponent } from './components/dialogs/intro-dialog/intro-dialog.component';
import { MaterialModule } from '../angular-material/material.module';
import { AuthGuardService } from '../route_guards/auth-guard/auth-guard.service';
import { CafGuard } from './route-guards/caf-guard/caf.guard';
import { ConsentGuard } from './route-guards/consent-guard/consent.guard';
import { DeclarationsGuard } from './route-guards/declarations-guard/declarations.guard';
import { CandidateDetailsGuard } from './route-guards/resolve-dashboard/candidate-details.guard';
import { AppRoutingModule } from '../routing/app-routing.module';
import { UpdatePasswordDialogComponent } from './components/dialogs/update-password-dialog/update-password-dialog.component';
import { ConsentDialogComponent } from './components/dialogs/consent-dialog/consent-dialog.component';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { GuardDialogComponent } from './components/dialogs/guard-dialog/guard-dialog.component';
import { AckEmployeeComponent } from './components/dashboard/form-f/ack-employee/ack-employee.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { WelfareFundComponent } from './components/dashboard/welfare-fund/welfare-fund.component';
import { ViewWelfareFundComponent } from './components/dashboard/view-welfare-fund/view-welfare-fund.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BankDeatilsComponent,
    CompanyAppFormComponent,
    CandidateDetailsComponent,
    AddressListComponent,
    IdentityListComponent,
    LanguageProficiencyComponent,
    RefpersonListComponent,
    EducationDetailsComponent,
    SpecialisedTrainingComponent,
    ExperienceDetailsComponent,
    TravelDetailsComponent,
    FormElevenComponent,
    DeclarationFormComponent,
    KycDetailsComponent,
    UndertakingDetailsComponent,
    FormFComponent,
    FormfIntroComponent,
    NomineeDetailsComponent,
    FormTwoComponent,
    NominationFormComponent,
    EpfnomineeDetailsComponent,
    EpsfamilyDetailsComponent,
    FormtwonomineeDetailsComponent,
    IdCardFormComponent,
    IdCardDetailsComponent,
    VehicleDetailsComponent,
    LandingPageComponent,
    IntroDialogComponent,
    MediClaimFormComponent,
    MediClaimDetailsComponent,
    MediFamDetailsComponent,

    ViewBankDetailsComponent,
    ViewCompanyAppFormComponent,
    ViewCandidateDetailsComponent,
    ViewEducationDocsComponent,
    ViewExperienceDocsComponent,
    ViewIdentityDocsComponent,
    ViewSpecDocsComponent,
    ViewFaqComponent,
    ViewFormElevenComponent,
    ViewFormFComponent,
    ViewFormTwoComponent,
    ViewIdCardFormComponent,
    ViewMediClaimFormComponent,

    CodeOfConductComponent,
    ConsentFormComponent,
    LoaDocumentComponent,
    NdaDocumentComponent,

    ConsentDialogComponent,
    IntroDialogComponent,
    UpdatePasswordDialogComponent,
    DeleteDialogComponent,
    GuardDialogComponent,
    AckEmployeeComponent,
    WelfareFundComponent,
    ViewWelfareFundComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    PdfViewerModule,
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "outerStrokeWidth": 10,
      "innerStrokeWidth": 1,
      "showBackground": true,
      "startFromZero": false,
      "titleColor": '#61A9DC',
      "unitsColor": '#61A9DC',
      "subtitleColor": '#61A9DC',
      "outerStrokeColor": '#4882c2',
      "innerStrokeColor": '#61A9DC'
    }),
    NgbModule,
    YouTubePlayerModule,
    MatCarouselModule,
    NgxPrintModule,
    NgxSignaturePadModule,
    Ng2TelInputModule,
    NgxIntlTelInputModule

  ],
  providers: [
    AuthGuardService,
    CandidateDetailsGuard,
    ConsentGuard,
    DeclarationsGuard,
    CafGuard,
  ],
  exports: [
  ]
})
export class ProdaptIndiaModule { }
