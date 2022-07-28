import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankDetails, BankDetailsService } from 'src/app/prodapt-india/services/bank-details/bank-details.service';

@Component({
  selector: 'app-view-bank-details',
  templateUrl: './view-bank-details.component.html',
  styleUrls: ['./view-bank-details.component.scss']
})
export class ViewBankDetailsComponent implements OnInit {
  showProgressBar: boolean = true;
  bankDetails?: BankDetails;

  imageUrl: any;
  pdfUrl: any;
  fileUrl: any;
  fileName: any;
  fileType: any;

  constructor(private bankDetailsService: BankDetailsService,
    private router: Router) {
    this.bankDetails = this.bankDetailsService.bankDetails;
    this.bankDetailsService.bankDetailsSubject.subscribe(
      bankDetails => {
        this.bankDetails = bankDetails;
      });

    if (this.bankDetails?.docImageUrl != null) {
      this.fileType = this.bankDetails.urlType;
      if (this.fileType === 'application/pdf') {
        this.pdfUrl = this.bankDetails.docImageUrl;
      }
      if (this.fileType === 'image/jpeg' || this.fileType === 'image/png' || this.fileType === 'image/x-eps') {
        this.imageUrl = this.bankDetails.docImageUrl;
      }
    }
  }

  ngOnInit(): void {
    if (this.bankDetails?.empId !== null) {
      this.showProgressBar = false;
    }
  }

  navigateToEditBank() {
    this.router.navigateByUrl('/dashboard/bankdetails')
  }
}
