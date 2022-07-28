import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LandingPage {
  id?: string;
  pageName: string;

  hrbpSpocList: ContactSpoc[];
  proboardingAdvisorList: ContactSpoc[];
  categoryList: CandidateCategory[];
  departmentList: CandidateCategory[];
  practicetagList: CandidateCategory[];
  faqList: FAQ[];
  homeDocList: HomeDoc[];
  linkList: Link[];
  youtubeLinkList: Link[];
}

export interface ContactSpoc {
  id?: string;
  name: string;
  email: string;
  mobileNumber: number;
}

export interface FAQ {
  id?: string;
  cardName: string;
  question: string;
  answer: string;
  importantFAQ: boolean;
}

export interface HomeDoc {
  id?: string;
  docName: string;
  docUrl: any;
}

export interface Link {
  id?: string;
  linkName: string;
  addLink: string;
}

export interface CandidateCategory {
  id?: string;
  categoryName: string;
}

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  public landingPage?: LandingPage;
  public subject = new Subject<LandingPage>();

  constructor(
    private httpClient: HttpClient) {
  }

  get landingPageSubject(): Observable<LandingPage> {
    return this.subject.asObservable();
  }

  getLandingPage() {
    this.httpClient.get(`${environment.API_ENDPOINT}` + `${environment.LANDING_PAGE_GET_URL}`,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      }
    ).subscribe(
      data => {
        this.landingPage = data as LandingPage;
        this.subject.next(this.landingPage);
      },
      error => {
        console.log(error);
      }
    );
  }
}
