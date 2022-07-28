import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSignaturePadComponent, SignaturePadOptions } from "@o.krucheniuk/ngx-signature-pad";
import { Candidate, CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { Declarations, DeclarationsService, Document } from 'src/app/prodapt-india/services/declarations/declarations.service';

@Component({
  selector: 'app-consent-form',
  templateUrl: './consent-form.component.html',
  styleUrls: ['./consent-form.component.scss']
})
export class ConsentFormComponent implements OnInit {

  candidate?: Candidate;
  declarations?: Declarations;
  dataSource?: Document[] = [];
  imageUrl?: any;
  consentDocument?: Document;

  @ViewChild('signPad')
  signaturePadElement?: NgxSignaturePadComponent;

  config: SignaturePadOptions = {
    minWidth: 1,
    maxWidth: 6,
    penColor: "blue"
  };

  constructor(private candidateService: CandidateService,
    private declarationsService: DeclarationsService) {
  }

  ngOnInit(): void {
    this.candidate = this.candidateService.candidate;
    this.candidateService.candidateSubject.subscribe(
      candidate => {
        this.candidate = candidate;
      });

    this.declarations = this.declarationsService.declarations;
    if (this.declarations?.documentsList) {
      this.dataSource = this.declarations?.documentsList;
      this.consentDocument = this.dataSource.filter(document => document.docName.includes('Consent'))[0];
      this.imageUrl = this.consentDocument.signImage;
    }

    this.declarationsService.$decSubject.subscribe(
      declarations => {
        this.declarations = declarations;
        if (declarations?.documentsList) {
          this.dataSource = declarations?.documentsList;
          this.consentDocument = this.dataSource.filter(document => document.docName.includes('Consent'))[0];
          this.imageUrl = this.consentDocument.signImage;
        }
      });
  }

  get consentDataSource(): Document[] {
    return this.dataSource ?? [];
  }

  public clear() {
    if (this.signaturePadElement) {
      this.signaturePadElement.clear();
    }
  }

  public getImage() {
    if (this.signaturePadElement) {
      this.imageUrl = this.signaturePadElement.toDataURL();
      let document: Document = {
        docName: 'Consent Document',
        docDesc: 'Consent Desc',
        signImage: this.imageUrl,
        signDate: new Date().getTime()
      }
      if (this.consentDocument?.id) {
        document.id = this.consentDocument?.id;
        this.dataSource?.push(document)
        this.declarationsService.updateDocument(document);
      } else {
        this.declarationsService.saveDocument(document);
      }
      this.signaturePadElement.clear();
    }
  }

  public isInValid(): boolean {
    return !(this.signaturePadElement && !this.signaturePadElement.isEmpty());
  }

}
