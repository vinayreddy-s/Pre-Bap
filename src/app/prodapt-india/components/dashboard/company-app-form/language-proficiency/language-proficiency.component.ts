import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidateDetails, CandidateDetailsService, Language } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-language-proficiency',
  templateUrl: './language-proficiency.component.html',
  styleUrls: ['./language-proficiency.component.scss']
})
export class LanguageProficiencyComponent implements OnInit {

  showProgressBar: boolean = true;
  languageFormGroup: FormGroup;
  candidateDetails?: CandidateDetails;
  maxEntriesReached: boolean = false;
  lan_read: boolean = false;
  lan_write: boolean = false;
  lan_speak: boolean = false;
  dataSource?: Language[] = [];

  constructor(public loaderService: LoaderService,
    private candidateDetailsService: CandidateDetailsService) {
    this.languageFormGroup = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ,. ]*')])),
      read: new FormControl(null),
      write: new FormControl(null),
      speak: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.candidateDetails = this.candidateDetailsService.candidateDetails;
    if (this.candidateDetails?.languageList !== null) {
      this.dataSource = this.candidateDetails?.languageList!;
    }

    this.candidateDetailsService.candidateDetailsSubject.subscribe(
      candidateDetails => {
        if (candidateDetails !== null) {
          this.candidateDetails = candidateDetails;
          if (this.candidateDetails?.languageList !== null) {
            this.dataSource = this.candidateDetails?.languageList!;
          }
        }
      }
    );

    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;

    }
    // if (this.dataSource) {
    //   if (this.dataSource.length >= 5) {
    //     this.maxEntriesReached = true;
    //   } else {
    //     this.maxEntriesReached = false;
    //   }
    // }
  }

  get langDataSource(): Language[] {
    return this.dataSource ?? [];
  }

  get languageFormControl() {
    return this.languageFormGroup.controls;
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000';
    }
  }

  addLine() {
    let language: Language = {
      id: this.languageFormControl.id.value,
      name: this.languageFormControl.name.value,
      read: this.languageFormControl.read.value,
      write: this.languageFormControl.write.value,
      speak: this.languageFormControl.speak.value
    };

    this.dataSource?.push(language);
    this.candidateDetailsService.saveLanguage(language);
    this.languageFormGroup.reset();

    // if (this.dataSource) {
    //   if (this.dataSource.length >= 5) {
    //     this.maxEntriesReached = true;
    //   } else {
    //     this.maxEntriesReached = false;
    //   }
    // }
  }

  removeLine(index: number) {
    if (this.dataSource) {
      this.candidateDetailsService.deleteLanguage(this.dataSource[index].id!);

      this.dataSource.splice(index, 1);
    
      // if (this.dataSource.length >= 5) {
      //   this.maxEntriesReached = true;
      // } else {
      //   this.maxEntriesReached = false;
      // }
    }
  }

}
