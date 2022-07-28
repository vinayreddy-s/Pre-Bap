import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankDeatilsComponent as BankDetailsComponent } from '../prodapt-india/components/dashboard/bank-deatils/bank-deatils.component';
import { CodeOfConductComponent } from '../prodapt-india/components/dashboard/code-of-conduct/code-of-conduct.component';
import { CompanyAppFormComponent } from '../prodapt-india/components/dashboard/company-app-form/company-app-form.component';
import { DashboardComponent } from '../prodapt-india/components/dashboard/dashboard.component';
import { FormElevenComponent } from '../prodapt-india/components/dashboard/form-eleven/form-eleven.component';
import { FormFComponent } from '../prodapt-india/components/dashboard/form-f/form-f.component';
import { FormTwoComponent } from '../prodapt-india/components/dashboard/form-two/form-two.component';
import { IdCardFormComponent } from '../prodapt-india/components/dashboard/id-card-form/id-card-form.component';
import { LandingPageComponent } from '../prodapt-india/components/dashboard/landing-page/landing-page.component';
import { MediClaimFormComponent } from '../prodapt-india/components/dashboard/medi-claim-form/medi-claim-form.component';
import { ViewBankDetailsComponent } from '../prodapt-india/components/dashboard/view-bank-details/view-bank-details.component';
import { ViewCompanyAppFormComponent } from '../prodapt-india/components/dashboard/view-company-app-form/view-company-app-form.component';
import { ViewFaqComponent } from '../prodapt-india/components/dashboard/view-faq/view-faq.component';
import { ViewFormElevenComponent } from '../prodapt-india/components/dashboard/view-form-eleven/view-form-eleven.component';
import { ViewFormFComponent } from '../prodapt-india/components/dashboard/view-form-f/view-form-f.component';
import { ViewFormTwoComponent } from '../prodapt-india/components/dashboard/view-form-two/view-form-two.component';
import { ViewIdCardFormComponent } from '../prodapt-india/components/dashboard/view-id-card-form/view-id-card-form.component';
import { ViewMediClaimFormComponent } from '../prodapt-india/components/dashboard/view-medi-claim-form/view-medi-claim-form.component';
import { LoginComponent } from '../components/login/login.component';
import { CafGuard } from '../prodapt-india/route-guards/caf-guard/caf.guard';
import { DeclarationsGuard } from '../prodapt-india/route-guards/declarations-guard/declarations.guard';
import { EditBankdetailsGuardService } from '../prodapt-india/route-guards/edit-guard/edit-bankdetails-guard.service';
import { EditCAFGuardService } from '../prodapt-india/route-guards/edit-guard/edit-caf-guard.service';
import { EditEpfkycGuardService } from '../prodapt-india/route-guards/edit-guard/edit-epfkyc-guard.service';
import { EditEpfnominationGuardService } from '../prodapt-india/route-guards/edit-guard/edit-epfnomination-guard.service';
import { EditGratuityGuardService } from '../prodapt-india/route-guards/edit-guard/edit-gratuity-guard.service';
import { EditIdcardGuardService } from '../prodapt-india/route-guards/edit-guard/edit-idcard-guard.service';
import { EditMediclaimGuardService } from '../prodapt-india/route-guards/edit-guard/edit-mediclaim-guard.service';
import { EpfkycGuard } from '../prodapt-india/route-guards/epfkyc-guard/epfkyc.guard';
import { EpfnominationGuard } from '../prodapt-india/route-guards/epfnomination-guard/epfnomination.guard';
import { GratuityGuard } from '../prodapt-india/route-guards/gratuity-guard/gratuity.guard';
import { IdcardGuard } from '../prodapt-india/route-guards/idcard-guard/idcard.guard';
import { MediclaimGuard } from '../prodapt-india/route-guards/mediclaim-guard/mediclaim.guard';
import { CandidateDetailsGuard } from '../prodapt-india/route-guards/resolve-dashboard/candidate-details.guard';
import { WelfareFundComponent } from '../prodapt-india/components/dashboard/welfare-fund/welfare-fund.component';
import { ViewWelfareFundComponent } from '../prodapt-india/components/dashboard/view-welfare-fund/view-welfare-fund.component';
import { BankGuardGuard } from '../prodapt-india/route-guards/bank-guard/bank-guard.guard';
import { EditWelfareFundGuard } from '../prodapt-india/route-guards/edit-guard/edit-welfare-fund.guard';
import { PreBapRevampComponent } from '../prodapt-india/components/dashboard/pre-bap-revamp/pre-bap-revamp.component';


const childRoutes: Routes = [
  { path: 'landingpage', component: LandingPageComponent, data: { animationState: 'landingpage' } },
  { path: 'codeofconduct', component: CodeOfConductComponent, data: { animationState: 'codeofconduct' } },
  { path: 'companyappform', component: CompanyAppFormComponent, canActivate: [DeclarationsGuard, EditCAFGuardService], data: { animationState: 'companyappform' } },
  { path: 'idcardform', component: IdCardFormComponent, data: { animationState: 'idcardform' } },
  { path: 'mediclaimform', component: MediClaimFormComponent, canActivate: [IdcardGuard, EditMediclaimGuardService], data: { animationState: 'mediclaimform' } },
  { path: 'formf', component: FormFComponent, canActivate: [MediclaimGuard, EditGratuityGuardService], data: { animationState: 'formf' } },
  { path: 'formeleven', component: FormElevenComponent, canActivate: [GratuityGuard, EditEpfkycGuardService], data: { animationState: 'formeleven' } },
  { path: 'formtwo', component: FormTwoComponent, canActivate: [EpfkycGuard, EditEpfnominationGuardService], data: { animationState: 'formtwo' } },
  { path: 'bankdetails', component: BankDetailsComponent, canActivate: [EpfnominationGuard, EditBankdetailsGuardService], data: { animationState: 'bankdetails' } },
  { path: 'welfaredetails', component: WelfareFundComponent, canActivate: [BankGuardGuard, EditWelfareFundGuard], data: { animationState: 'welfaredetails' } },
  { path: '', redirectTo: "codeofconduct", pathMatch: "full" },

  { path: 'viewfaq/:faqsection', component: ViewFaqComponent, data: { animationState: 'viewfaq' } },
  { path: 'viewcompanyappform', component: ViewCompanyAppFormComponent, data: { animationState: 'viewcompanyappform' } },
  { path: 'viewidcardform', component: ViewIdCardFormComponent, data: { animationState: 'viewidcardform' } },
  { path: 'viewmediclaimform', component: ViewMediClaimFormComponent, data: { animationState: 'viewmediclaimform' } },
  { path: 'viewformf', component: ViewFormFComponent, data: { animationState: 'viewformf' } },
  { path: 'viewformeleven', component: ViewFormElevenComponent, data: { animationState: 'viewformeleven' } },
  { path: 'viewformtwo', component: ViewFormTwoComponent, data: { animationState: 'viewformtwo' } },
  { path: 'viewbankdetails', component: ViewBankDetailsComponent, data: { animationState: 'viewbankdetails' } },
  { path: 'viewwelfaredetails', component: ViewWelfareFundComponent, data: { animationState: 'viewwelfaredetails' } },


];

const routes: Routes = [
    // Added path for new page
    { path: 'prebapapplication', component: PreBapRevampComponent },
  { path: "login", component: LoginComponent, data: { animationState: 'login' } },
  {
    path: "dashboard", component: DashboardComponent,
    //canActivate: [AuthGuardService],
    resolve: { candidateDetails: CandidateDetailsGuard },
    children: childRoutes,
    data: { animationState: 'dashboard' }
  },
  { path: "**", component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [RouterModule],
  // providers : [AuthGuardService]
})
export class AppRoutingModule { }
