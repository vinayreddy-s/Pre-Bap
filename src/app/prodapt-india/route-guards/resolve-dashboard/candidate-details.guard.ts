import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BankDetailsService } from 'src/app/prodapt-india/services/bank-details/bank-details.service';
import { CandidateDetails, CandidateDetailsService } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { DeclarationsService } from 'src/app/prodapt-india/services/declarations/declarations.service';
import { EpfKycFormService } from 'src/app/prodapt-india/services/epf-kyc-form/epf-kyc-form.service';
import { EpfNominationService } from 'src/app/prodapt-india/services/epf-nomination/epf-nomination.service';
import { GratuityFormFService } from 'src/app/prodapt-india/services/gratuity-form-f/gratuity-form-f.service';
import { IdCardFormService } from 'src/app/prodapt-india/services/id-card-form/id-card-form.service';
import { LandingPageService } from 'src/app/prodapt-india/services/landing-page/landing-page.service';
import { MediclaimFormService } from 'src/app/prodapt-india/services/medi-claim-form/medi-claim-form.service';
import { WelfareFundService } from '../../services/welfare-fund/welfare-fund.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateDetailsGuard implements Resolve<CandidateDetails> {

  constructor(
    private candidateService: CandidateService,
    private candidateDetailsService: CandidateDetailsService,
    private idCardService: IdCardFormService,
    private mediclaimService: MediclaimFormService,
    private gratuityService: GratuityFormFService,
    private epfNominationService: EpfNominationService,
    private epfKycFormService: EpfKycFormService,
    private bankDetailsService: BankDetailsService,
    private landingPageService: LandingPageService,
    private declarationService: DeclarationsService,
    private welfareFundService: WelfareFundService
  ) {

    this.candidateService.getCandidate(sessionStorage.getItem('empId') ?? '');
    this.declarationService.getDeclarations(sessionStorage.getItem('empId') ?? '');
    this.candidateDetailsService.getCandidateDetailsForm(sessionStorage.getItem('empId') ?? '');
    this.idCardService.getIdCard(sessionStorage.getItem('empId') ?? '');
    this.mediclaimService.getMediclaimInfo(sessionStorage.getItem('empId') ?? '');
    this.gratuityService.getGratuityForm(sessionStorage.getItem('empId') ?? '');
    this.epfKycFormService.getepfKYCDetails(sessionStorage.getItem('empId') ?? '');
    this.epfNominationService.getEPFNominationForm(sessionStorage.getItem('empId') ?? '');
    this.bankDetailsService.getBankDetails(sessionStorage.getItem('empId') ?? '');
    this.welfareFundService.getWelfareFundDetails(sessionStorage.getItem('empId') ?? '');
    this.landingPageService.getLandingPage();

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CandidateDetails | Observable<CandidateDetails> | Promise<CandidateDetails> {
    return new Promise(resolve => {
      this.candidateDetailsService.candidateDetailsSubject.subscribe(
        data => {
          resolve(data as CandidateDetails);
        }
      )
    })
  }

}
