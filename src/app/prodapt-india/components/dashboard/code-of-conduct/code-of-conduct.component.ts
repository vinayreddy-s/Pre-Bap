import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/prodapt-india/services/candidate/candidate.service';
import { DashboardService } from 'src/app/prodapt-india/services/dashboard/dashboard.service';
import { Declarations, DeclarationsService } from 'src/app/prodapt-india/services/declarations/declarations.service';

@Component({
  selector: 'app-code-of-conduct',
  templateUrl: './code-of-conduct.component.html',
  styleUrls: ['./code-of-conduct.component.scss']
})
export class CodeOfConductComponent implements OnInit {

  constructor(private declarationsService: DeclarationsService,
    private candidateService: CandidateService, 
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
    if (this.candidateService.candidate) {
      if (!this.declarationsService.declarations) {
        let decls: Declarations = {
          empId: this.candidateService.candidate?.id!,
          empName: this.candidateService.candidate?.name!,
          email: this.candidateService.candidate?.email!,
        }
        this.declarationsService.saveDeclarations(decls);
      }
    }

    this.declarationsService.$decSubject.subscribe (
      declarations => {
        this.dashboardService.calcuclatePercentageProgress();
      }
    )
  }

}
