import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BankDetailsService } from '../bank-details/bank-details.service';
import { CandidateDetailsService } from '../candidate-details/candidate-details.service';
import { CandidateService } from '../candidate/candidate.service';
import { DeclarationsService } from '../declarations/declarations.service';
import { EpfKycFormService } from '../epf-kyc-form/epf-kyc-form.service';
import { EpfNominationService } from '../epf-nomination/epf-nomination.service';
import { GratuityFormFService } from '../gratuity-form-f/gratuity-form-f.service';
import { IdCardFormService } from '../id-card-form/id-card-form.service';
import { MediclaimFormService } from '../medi-claim-form/medi-claim-form.service';
import { WelfareFundService } from '../welfare-fund/welfare-fund.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  percentProgress: number = 0;
  candidateDetailsDone: boolean = false;
  idCardDone: boolean = false;
  mediClaimDone: boolean = false;
  gratuityFormFDone: boolean = false;
  epfKYCFormDone: boolean = false;
  epfNominationDone: boolean = false;
  bankDetailsDone: boolean = false;
  welfareDetailsDone: boolean = false;
  isConsultant: Boolean = false;
  isDirectConsultant: boolean = false;
  isVendorConsultant: boolean = false;
  isShorttermIntern: boolean = false;
  isIntern: boolean = false;

  public ppSubject = new Subject<number>();

  constructor(
    private candidateService: CandidateService,
    private declarationsService: DeclarationsService,
    private candidateDetailsService: CandidateDetailsService,
    private idCardService: IdCardFormService,
    private mediclaimService: MediclaimFormService,
    private gratuityService: GratuityFormFService,
    private epfNominationService: EpfNominationService,
    private epfKycFormService: EpfKycFormService,
    private bankDetailsService: BankDetailsService,
    private welfareFundService: WelfareFundService
  ) {

  }

  get percentProgressSubject(): Observable<number> {
    return this.ppSubject.asObservable();
  }

  calcuclatePercentageProgress(): number {
    this.percentProgress = 0;
    this.isConsultant = sessionStorage.getItem('category') === 'Consultant' ? true : false;
    this.isDirectConsultant = sessionStorage.getItem('category') === 'Direct Consultant' ? true : false;
    this.isVendorConsultant = sessionStorage.getItem('category') === 'Vendor Consultant' ? true : false;
    this.isShorttermIntern = sessionStorage.getItem('category') === 'Short-term Intern' ? true : false;
    this.isIntern = sessionStorage.getItem('category') === 'Intern' ? true : false;

    if (this.isConsultant || this.isDirectConsultant || this.isVendorConsultant || this.isShorttermIntern || this.isIntern) {
      if (this.declarationsService.declarations) {
        if (this.declarationsService.declarations.documentsList?.length === 3) {
          if (this.candidateService.candidate) {
            this.candidateService.candidate.declarationsDone = true;
            this.percentProgress = this.percentProgress + 13;
          }
        }
      }
    } else {
      if (this.declarationsService.declarations) {
        if (this.declarationsService.declarations.documentsList?.length === 3) {
          if (this.candidateService.candidate) {
            this.candidateService.candidate.declarationsDone = true;
            this.percentProgress = this.percentProgress + 1;
          }
        }
      }
    }

    if (this.candidateDetailsService.candidateDetails) {
      var percent = 0;
      this.percentProgress = this.percentProgress + 20;
      percent = percent + 20;
      if (this.candidateDetailsService.candidateDetails.addressList) {
        if (this.candidateDetailsService.candidateDetails.addressList.length >= 2) {
          this.percentProgress = this.percentProgress + 6;
          percent = percent + 6;
        }
      }
      if (this.candidateDetailsService.candidateDetails.identityList) {
        if (this.candidateDetailsService.candidateDetails.identityList.length >= 2) {
          this.percentProgress = this.percentProgress + 6;
          percent = percent + 6;
        }
      }
      if (this.candidateDetailsService.candidateDetails.languageList) {
        if (this.candidateDetailsService.candidateDetails.languageList.length >= 1) {
          this.percentProgress = this.percentProgress + 2;
          percent = percent + 2;
        }
      }
      if (this.candidateDetailsService.candidateDetails.refPersonList) {
        if (this.candidateDetailsService.candidateDetails.refPersonList.length >= 1) {
          this.percentProgress = this.percentProgress + 2;
          percent = percent + 2;
        }
      }
      if (this.candidateDetailsService.candidateDetails.educationList) {
        if (this.candidateDetailsService.candidateDetails.educationList.length >= 3) {
          this.percentProgress = this.percentProgress + 9;
          percent = percent + 9;
        }
      }
      if (this.candidateDetailsService.candidateDetails.specializationList) {
        if (this.candidateDetailsService.candidateDetails.specializationList.length >= 1) {
          this.percentProgress = this.percentProgress + 7;
          percent = percent + 7;
        }
      }
      if (this.candidateDetailsService.candidateDetails.workList) {
        if (this.candidateDetailsService.candidateDetails.workList.length >= 1) {
          this.percentProgress = this.percentProgress + 8;
          percent = percent + 8;
        }
      }
      if (this.candidateDetailsService.candidateDetails.travelList) {
        if (this.candidateDetailsService.candidateDetails.travelList.length >= 1) {
          this.percentProgress = this.percentProgress + 1;
          percent = percent + 1;
        }
      }

      if (this.candidateService.candidate) {
        if (percent >= 61) {
          this.candidateService.candidate.candidateDetailsDone = true;
        } else {
          this.candidateService.candidate.candidateDetailsDone = false;
        }
      }
    }

    if (this.isDirectConsultant || this.isShorttermIntern) {
      if (this.idCardService.idCard) {
        var percent = 0;
        this.percentProgress = this.percentProgress + 7;
        percent = percent + 7;
        if (this.idCardService.idCard.vehicleDetails !== null) {
          if (this.idCardService.idCard.vehicleDetails?.length! >= 1) {
            this.percentProgress = this.percentProgress + 6;
            percent = percent + 6;
          }
        }
        if (this.candidateService.candidate) {
          if (percent >= 13) {
            this.candidateService.candidate.idCardDone = true;
          } else {
            this.candidateService.candidate.idCardDone = false;
          }
        }
      }
    } else if (this.isIntern) {
      if (this.idCardService.idCard) {
        var percent = 0;
        this.percentProgress = this.percentProgress + 5;
        percent = percent + 5;
        if (this.idCardService.idCard.vehicleDetails !== null) {
          if (this.idCardService.idCard.vehicleDetails?.length! >= 1) {
            this.percentProgress = this.percentProgress + 4;
            percent = percent + 4;
          }
        }
        if (this.candidateService.candidate) {
          if (percent >= 9) {
            this.candidateService.candidate.idCardDone = true;
          } else {
            this.candidateService.candidate.idCardDone = false;
          }
        }
      }
    } else if (this.isVendorConsultant) {
      if (this.idCardService.idCard) {
        var percent = 0;
        this.percentProgress = this.percentProgress + 13;
        percent = percent + 13;
        if (this.idCardService.idCard.vehicleDetails !== null) {
          if (this.idCardService.idCard.vehicleDetails?.length! >= 1) {
            this.percentProgress = this.percentProgress + 13;
            percent = percent + 13;
          }
        }
        if (this.candidateService.candidate) {
          if (percent >= 26) {
            this.candidateService.candidate.idCardDone = true;
          } else {
            this.candidateService.candidate.idCardDone = false;
          }
        }
      }
    }
    else {
      if (this.idCardService.idCard) {
        var percent = 0;
        this.percentProgress = this.percentProgress + 2;
        percent = percent + 2;
        if (this.idCardService.idCard.vehicleDetails !== null) {
          if (this.idCardService.idCard.vehicleDetails?.length! >= 1) {
            this.percentProgress = this.percentProgress + 1;
            percent = percent + 1;
          }
        }
        if (this.candidateService.candidate) {
          if (percent >= 3) {
            this.candidateService.candidate.idCardDone = true;
          } else {
            this.candidateService.candidate.idCardDone = false;
          }
        }

      }
    }

    if (this.isIntern) {
      if (this.mediclaimService.mediclaim) {
        var percent = 0;
        this.percentProgress = this.percentProgress + 5;
        percent = percent + 5;
        if (this.mediclaimService.mediclaim.relationList !== null) {
          if (this.mediclaimService.mediclaim.relationList.length! >= 1) {
            this.percentProgress = this.percentProgress + 4;
            percent = percent + 4;
          }
        }
        if (this.candidateService.candidate) {
          if (percent >= 9) {
            this.candidateService.candidate.mediclaimDone = true;
          } else {
            this.candidateService.candidate.mediclaimDone = false;
          }
        }
      }
    } else {
      if (this.mediclaimService.mediclaim) {
        var percent = 0;
        this.percentProgress = this.percentProgress + 1;
        percent = percent + 1;
        if (this.mediclaimService.mediclaim.relationList !== null) {
          if (this.mediclaimService.mediclaim.relationList.length! >= 1) {
            this.percentProgress = this.percentProgress + 3;
            percent = percent + 3;
          }
        }
        if (this.candidateService.candidate) {
          if (percent >= 4) {
            this.candidateService.candidate.mediclaimDone = true;
          } else {
            this.candidateService.candidate.mediclaimDone = false;
          }
        }
      }
    }

    if (this.gratuityService.gratuity) {
      var percent = 0;
      this.percentProgress = this.percentProgress + 2;
      percent = percent + 2;
      if (this.gratuityService.gratuity.nomineeList !== null) {
        if (this.gratuityService.gratuity.nomineeList.length >= 1) {
          this.percentProgress = this.percentProgress + 4;
          percent = percent + 4;
        }
      }
      if (this.candidateService.candidate) {
        if (percent >= 6) {
          this.candidateService.candidate.gratuityDone = true;
        } else {
          this.candidateService.candidate.gratuityDone = false;
        }
      }
    }

    if (this.epfKycFormService.epfKYCDetails) {
      var percent = 0;
      this.percentProgress = this.percentProgress + 4;
      percent = percent + 4;
      if (this.epfKycFormService.epfKYCDetails.kycDetailList !== null) {
        if (this.epfKycFormService.epfKYCDetails.kycDetailList.length >= 2) {
          this.percentProgress = this.percentProgress + 4;
          percent = percent + 4;
        }
      }
      if (this.candidateService.candidate) {
        if (percent >= 8) {
          this.candidateService.candidate.epfkycDone = true;
        } else {
          this.candidateService.candidate.epfkycDone = false;
        }
      }
    }

    if (this.epfNominationService.epfNomination) {
      var percent = 0;
      this.percentProgress = this.percentProgress + 1;
      percent = percent + 1;
      if (this.epfNominationService.epfNomination.epfNomineeList !== null) {
        if (this.epfNominationService.epfNomination.epfNomineeList.length >= 1) {
          this.percentProgress = this.percentProgress + 4;
          percent = percent + 4;
        }
      }
      if (this.epfNominationService.epfNomination.epsFamilyList !== null) {
        if (this.epfNominationService.epfNomination.epsFamilyList.length >= 1) {
          this.percentProgress = this.percentProgress + 4;
          percent = percent + 4;
        }
      }
      if (this.epfNominationService.epfNomination.nomineeList !== null) {
        if (this.epfNominationService.epfNomination.nomineeList.length >= 1) {
          this.percentProgress = this.percentProgress + 4;
          percent = percent + 4;
        }
      }
      if (this.candidateService.candidate) {
        if (percent >= 13) {
          this.candidateService.candidate.epfNominationDone = true;
        } else {
          this.candidateService.candidate.epfNominationDone = false;
        }
      }
    }

    if (this.isConsultant || this.isDirectConsultant || this.isShorttermIntern) {
      if (this.bankDetailsService.bankDetails) {
        var percent = 0;
        this.percentProgress = this.percentProgress + 13;
        percent = percent + 13;
        if (this.candidateService.candidate) {
          if (percent >= 13) {
            this.candidateService.candidate.bankDetailsDone = true;
          } else {
            this.candidateService.candidate.bankDetailsDone = false;
          }
        }
      }
    } else if (this.isIntern) {
      if (this.bankDetailsService.bankDetails) {
        var percent = 0;
        this.percentProgress = this.percentProgress + 8;
        percent = percent + 8;
        if (this.candidateService.candidate) {
          if (percent >= 8) {
            this.candidateService.candidate.bankDetailsDone = true;
          } else {
            this.candidateService.candidate.bankDetailsDone = false;
          }
        }
      }
    }
    else {
      if (this.bankDetailsService.bankDetails) {
        var percent = 0;
        this.percentProgress = this.percentProgress + 3;
        percent = percent + 3;
        if (this.candidateService.candidate) {
          if (percent >= 3) {
            this.candidateService.candidate.bankDetailsDone = true;
          } else {
            this.candidateService.candidate.bankDetailsDone = false;
          }
        }
      }
    }

    if (this.welfareFundService.welfareFund) {
      var percent = 0;
      this.percentProgress = this.percentProgress + 1;
      percent = percent + 1;
      if (this.candidateService.candidate) {
        if (percent >= 1) {
          this.candidateService.candidate.welfareDetailsDone = true;
        } else {
          this.candidateService.candidate.welfareDetailsDone = false;
        }
      }
    }

    this.ppSubject.next(this.percentProgress);

    if (this.candidateService.candidate) {
      if (this.percentProgress !== this.candidateService.candidate.percentProgress) {
        this.candidateService.candidate.percentProgress = this.percentProgress;
        this.candidateService.updateCandidate(this.candidateService.candidate);
      }
    }
    return this.percentProgress;
  }

}
