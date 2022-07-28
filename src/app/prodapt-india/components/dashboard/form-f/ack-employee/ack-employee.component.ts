import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Gratuity, GratuityFormFService } from 'src/app/prodapt-india/services/gratuity-form-f/gratuity-form-f.service';
import { NgxSignaturePadComponent, SignaturePadOptions } from '@o.krucheniuk/ngx-signature-pad';

@Component({
  selector: 'app-ack-employee',
  templateUrl: './ack-employee.component.html',
  styleUrls: ['./ack-employee.component.scss']
})
export class AckEmployeeComponent implements OnInit {
  ackEmployeeFormGroup: FormGroup;
  showProgressBar: boolean = true;
  gratuity?: Gratuity;
  ackSignImageUrl: any;
  doc?: Date;
  today = new Date();

  @ViewChild('signPad')
  signaturePadElement?: NgxSignaturePadComponent;

  config: SignaturePadOptions = {
    minWidth: 1,
    maxWidth: 6,
    penColor: "blue"
  };

  constructor(private gratuityFormService: GratuityFormFService) {
    this.ackEmployeeFormGroup = new FormGroup({
      empId: new FormControl(sessionStorage.getItem('empId')),
      id: new FormControl(),
      ackSignImage: new FormControl(null),
      ackDate: new FormControl(null)
    });
  }

  ngOnInit(): void {

    // Fetch data from Form F Details
    this.gratuity = this.gratuityFormService.gratuity;
    if (this.gratuityFormService) {
      this.ackEmployeeFormGroup.patchValue({
        id: this.gratuity?.id,
        empId: sessionStorage.getItem('empId'),
        ackSignImage: this.gratuity?.ackSignImage,
        ackDate: new Date(this.gratuity?.ackDate!),
      });
    }
    this.gratuityFormService.gratuitySubject.subscribe(
      gratuity => {
        this.gratuity = gratuity;
      });
    if (this.gratuity?.ackSignImage) {
      this.ackSignImageUrl = this.gratuity.ackSignImage;
    }
    if (this.gratuity?.empId !== null) {
      this.showProgressBar = false;
    }
  }

  public clear() {
    if (this.signaturePadElement) {
      this.signaturePadElement.clear();
    }
  }

  public getImage() {
    if (this.signaturePadElement) {
      this.ackSignImageUrl = this.signaturePadElement.toDataURL();
      this.signaturePadElement.clear();
    }
  }

  public isInValid(): boolean {
    return !(this.signaturePadElement && !this.signaturePadElement.isEmpty());
  }

  get formfFormControl() {
    return this.ackEmployeeFormGroup.controls;
  }

  saveAckEmployeeForm() {
    if (!this.ackEmployeeFormGroup.valid) {
      var invalidControls = [];
      const controls = this.ackEmployeeFormGroup.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalidControls.push(name);
        }
      }
    } else {
      if (this.gratuity) {
        this.gratuity.ackSignImage = this.ackSignImageUrl;
        this.gratuity.ackDate = new Date().getTime();
        this.gratuityFormService.updateGratuityForm(this.gratuity!);
      } else {
        this.gratuityFormService.saveGratuityForm(this.ackEmployeeFormGroup.value);
      }
    }
  }

}
