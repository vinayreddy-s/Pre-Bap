import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gratuity, GratuityFormFService } from 'src/app/prodapt-india/services/gratuity-form-f/gratuity-form-f.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-view-form-f',
  templateUrl: './view-form-f.component.html',
  styleUrls: ['./view-form-f.component.scss']
})
export class ViewFormFComponent implements OnInit {
  showProgressBar: boolean = true;
  gratuity?: Gratuity;
  ackSignImageUrl: any;
  formfSignImageUrl: any;

  constructor(private router: Router,
    private gratuityFormService: GratuityFormFService,
    public loaderService: LoaderService) {

    this.gratuity = this.gratuityFormService.gratuity;
    this.gratuityFormService.gratuitySubject.subscribe(
      gratuity => {
        this.gratuity = gratuity;
      });
    if (this.gratuity?.formfSignImage) {
      this.formfSignImageUrl = this.gratuity.formfSignImage;
    }
    if (this.gratuity?.ackSignImage) {
      this.ackSignImageUrl = this.gratuity.ackSignImage;
    }
  }

  ngOnInit(): void {
    if (this.gratuity?.empId !== null) {
      this.showProgressBar = false;
    }
  }

  navigateToEditFormF() {
    this.router.navigateByUrl('/dashboard/formf')
  }

}
