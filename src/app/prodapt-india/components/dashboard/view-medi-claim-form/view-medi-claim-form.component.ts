import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Mediclaim, MediclaimFormService } from 'src/app/prodapt-india/services/medi-claim-form/medi-claim-form.service';

@Component({
  selector: 'app-view-medi-claim-form',
  templateUrl: './view-medi-claim-form.component.html',
  styleUrls: ['./view-medi-claim-form.component.scss']
})
export class ViewMediClaimFormComponent implements OnInit {
  showProgressBar: boolean = true;
  mediclaim?: Mediclaim;

  constructor(private mediclaimService: MediclaimFormService,
    private router: Router,
    public loaderService: LoaderService) {
    this.mediclaim = this.mediclaimService.mediclaim;
    this.mediclaimService.mediclaimSubject.subscribe(
      mediclaim => {
        this.mediclaim = mediclaim;
      });
  }

  ngOnInit(): void {
    if (this.mediclaim?.empId !== null) {
      this.showProgressBar = false;
    }
  }
  navigateToEditMediClaim() {
    this.router.navigateByUrl('/dashboard/mediclaimform')
  }

}
