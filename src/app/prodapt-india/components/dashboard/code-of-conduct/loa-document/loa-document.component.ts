import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSignaturePadComponent, SignaturePadOptions } from '@o.krucheniuk/ngx-signature-pad';
import { Candidate, CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { Declarations, DeclarationsService, Document } from 'src/app/prodapt-india/services/declarations/declarations.service';

@Component({
  selector: 'app-loa-document',
  templateUrl: './loa-document.component.html',
  styleUrls: ['./loa-document.component.scss']
})
export class LoaDocumentComponent implements OnInit {

  candidate?: Candidate;
  declarations?: Declarations;
  dataSource?: Document[] = [];
  imageUrl?: any;
  loaDocument?: Document;

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
      this.loaDocument = this.dataSource.filter(document => document.docName.includes('LOA'))[0];
      this.imageUrl = this.loaDocument.signImage;
    }

    this.declarationsService.$decSubject.subscribe(
      declarations => {
        this.declarations = declarations;
        if (declarations?.documentsList) {
          this.dataSource = declarations?.documentsList;
          this.loaDocument = this.dataSource.filter(document => document.docName.includes('LOA'))[0];
          this.imageUrl = this.loaDocument.signImage;
        }
      });
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
        docName: 'LOA Document',
        docDesc: 'LOA Desc',
        signImage: this.imageUrl,
        signDate: new Date().getTime()
      }
      if (this.loaDocument?.id) {
        document.id = this.loaDocument?.id;
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
