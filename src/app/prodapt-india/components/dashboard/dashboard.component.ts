import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { routeTransitionAnimations } from 'src/app/routing/route-transition-animation';
import { AuthService } from 'src/app/prodapt-india/services/auth/auth.service';
import { BankDetails } from 'src/app/prodapt-india/services/bank-details/bank-details.service';
import { CandidateDetails } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { Candidate, CandidateService, UpdatePasswordDetails } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { DashboardService } from 'src/app/prodapt-india/services/dashboard/dashboard.service';
import { EPFKYCDetails } from 'src/app/prodapt-india/services/epf-kyc-form/epf-kyc-form.service';
import { EPFNomination } from 'src/app/prodapt-india/services/epf-nomination/epf-nomination.service';
import { Gratuity } from 'src/app/prodapt-india/services/gratuity-form-f/gratuity-form-f.service';
import { IdCard } from 'src/app/prodapt-india/services/id-card-form/id-card-form.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Mediclaim } from 'src/app/prodapt-india/services/medi-claim-form/medi-claim-form.service';
import { UpdatePasswordDialogComponent } from '../dialogs/update-password-dialog/update-password-dialog.component';
import { WelfareFund } from '../../services/welfare-fund/welfare-fund.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routeTransitionAnimations]
})
export class DashboardComponent implements OnInit {
  candidate?: Candidate;
  candidateDetails?: CandidateDetails;
  idCard?: IdCard;
  mediclaim?: Mediclaim;
  gratuity?: Gratuity;
  epfNomination?: EPFNomination;
  epfKycDetails?: EPFKYCDetails;
  bankDetails?: BankDetails;
  welfareFund?: WelfareFund;
  candidateDetailsDone: boolean = false;
  idCardDone: boolean = false;
  mediClaimDone: boolean = false;
  gratuityFormFDone: boolean = false;
  epfKYCFormDone: boolean = false;
  epfNominationDone: boolean = false;
  bankDetailsDone: boolean = false;
  isConsultant: Boolean = false;
  isDirectConsultant: boolean = false;
  isVendorConsultant: boolean = false;
  isShorttermIntern: boolean = false;
  isIntern: boolean = false;

  // faqImages: string[] = [ '../../../../assets/undraw_faq_hr.svg', '../../../../assets/undraw_faq_pf.svg']
  // faqSections: string[] = ['FAQ', 'Benefits'];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isDarkTheme: boolean = false;
  showFiller = true;
  isApproved: boolean = sessionStorage.getItem('empStatus') === 'Approved' ? true : false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private loaderService: LoaderService,
    private authService: AuthService,
    private router: Router,
    public candidateService: CandidateService,
    private matDialog: MatDialog,
    public dashboardService: DashboardService) {

  }

  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false;
    this.loaderService.isDarkTheme = this.isDarkTheme;

    this.isConsultant = sessionStorage.getItem('category') === 'Consultant' ? true : false;
    this.isDirectConsultant = sessionStorage.getItem('category') === 'Direct Consultant' ? true : false;
    this.isVendorConsultant = sessionStorage.getItem('category') === 'Vendor Consultant' ? true : false;
    this.isShorttermIntern = sessionStorage.getItem('category') === 'Short-term Intern' ? true : false;
    this.isIntern = sessionStorage.getItem('category') === 'Intern' ? true : false;
  
    this.candidate = this.candidateService.candidate;
    this.candidateService.subject.subscribe(
      candidate => {
        this.candidate = candidate;
      }
    );
  }

  storeThemeSelection() {
    localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
    this.loaderService.isDarkTheme = this.isDarkTheme;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000';
    }
  }

  onUpdatePassword() {
    const dialogRef = this.matDialog.open(UpdatePasswordDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(data => {
      let updatePasswordDetails = data as UpdatePasswordDetails;

      if (this.candidate !== undefined) {
        this.candidate.password = updatePasswordDetails.newPassword;
        this.candidateService.updateCandidatePassword(this.candidate);
      }
    });
  }

  onLogOutClicked() {
    this.authService.logout().subscribe(
      bool => {
        this.router.navigateByUrl('/login');
      }
    );
  }

  accordiannFn = (eve: any) => {
    console.log('event', eve.currentTarget)
    eve.currentTarget.classList.toggle('active')
      }
  navigateTo(faqSection: string) {
    this.router.navigateByUrl(`/dashboard/viewfaq/${faqSection}`);
   }
}
