import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/prodapt-india/services/auth/auth.service';
import { IdCard, IdCardFormService } from 'src/app/prodapt-india/services/id-card-form/id-card-form.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-view-id-card-form',
  templateUrl: './view-id-card-form.component.html',
  styleUrls: ['./view-id-card-form.component.scss']
})
export class ViewIdCardFormComponent implements OnInit {
  showProgressBar: boolean = true;
  idCard?: IdCard;
  ppImageUrl: any;
  isCandidateApproved: boolean = false;

  constructor(private router: Router,
    private idCardFormService: IdCardFormService,
    private authService: AuthService,
    public loaderService: LoaderService) {
    this.isCandidateApproved = this.authService.isCandidateApproved;

    this.idCard = this.idCardFormService.idCard;
    this.idCardFormService.$idCardSubject.subscribe(
      idCard => {
        this.idCard = idCard;
      });

    if (this.idCard?.photoImage) {
      this.ppImageUrl = this.idCard.photoImage;
    }
  }

  ngOnInit(): void {
    if (this.idCard?.empId !== null) {
      this.showProgressBar = false;
    }
  }

  navigateToEditIdCard() {
    this.router.navigateByUrl('/dashboard/idcardform')
  }
}
