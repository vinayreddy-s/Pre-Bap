import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { routeTransitionAnimations } from 'src/app/routing/route-transition-animation';
import { Candidate, CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { HomeDoc, LandingPage, LandingPageService } from 'src/app/prodapt-india/services/landing-page/landing-page.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: [routeTransitionAnimations]
})
export class LandingPageComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


  owlOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  landingPage?: LandingPage;
  candidate?: Candidate;
  showProgressBar: boolean = true;
  percentProgress: number = 0;
  apiLoaded: boolean = false;
  generalUrl: any = '../../../../assets/onboarding.jpg';

  faqImages: string[] = [ '../../../../assets/undraw_faq_hr.svg', '../../../../assets/undraw_faq_pf.svg']
  faqSections: string[] = ['FAQ', 'Benefits'];

  constructor(private landingPageService: LandingPageService,
    private breakpointObserver: BreakpointObserver,
    private candidateService: CandidateService,
    private router: Router) {

    this.candidate = this.candidateService.candidate;
    this.percentProgress = 0;
    this.percentProgress = this.candidateService.candidate?.percentProgress!;
    this.candidateService.candidateSubject.subscribe(
      candidate => {
        this.candidate = candidate;
        this.percentProgress = candidate.percentProgress!;
      });

    this.landingPage = this.landingPageService.landingPage;
    this.landingPageService.landingPageSubject.subscribe(
      landingPage => {
        this.landingPage = landingPage;
      });
  }

  ngOnInit(): void {
    if (this.landingPage?.id !== null) {
      this.showProgressBar = false;
    }

    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }
  iFrameResize() {

  }

  onDownload(homeDoc: HomeDoc) {
    var link = document.createElement('a');
    link.href = homeDoc.docUrl;
    link.download = homeDoc.docName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }

  navigateTo(faqSection: string) {
    this.router.navigateByUrl(`/dashboard/viewfaq/${faqSection}`);
  }

}
