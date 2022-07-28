import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routeTransitionAnimations } from 'src/app/routing/route-transition-animation';
import { CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { FAQ, HomeDoc, LandingPage, LandingPageService } from 'src/app/prodapt-india/services/landing-page/landing-page.service';

@Component({
  selector: 'app-view-faq',
  templateUrl: './view-faq.component.html',
  styleUrls: ['./view-faq.component.scss'],
  animations: [routeTransitionAnimations]
})
export class ViewFaqComponent implements OnInit {
  showProgressBar: boolean = true;
  landingPage?: LandingPage;
  dataSource?: FAQ[] = [];
  faqSectionSelected?: string;
  //condition : boolean =true

  constructor(private candidateService: CandidateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private landingPageService: LandingPageService) {
  }

  ngOnInit(): void {
    this.faqSectionSelected = this.activatedRoute.snapshot.params['faqsection'];

    this.landingPage = this.landingPageService.landingPage;
    this.dataSource = this.landingPage?.faqList.filter(faq => faq.cardName === this.faqSectionSelected);

    this.landingPageService.landingPageSubject.subscribe(
      landingPage => {
        this.landingPage = landingPage;
        this.dataSource = this.landingPage.faqList.filter(faq => faq.cardName === this.faqSectionSelected);
      });

    if (this.landingPage?.id !== null) {
      this.showProgressBar = false;
    }
  }

  onDownload(homeDoc: HomeDoc) {
    var link = document.createElement('a');
    link.href = homeDoc.docUrl;
    link.download = homeDoc.docName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }

  navigateHomePage() {
    this.router.navigateByUrl('/dashboard/')
  }
}
