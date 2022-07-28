import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address, CandidateDetails, CandidateDetailsService } from 'src/app/prodapt-india/services/candidate-details/candidate-details.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

  addreslistFormGroup: FormGroup;
  dataSource?: Address[] = [];
  showProgressBar: boolean = true;
  candidateDetails?: CandidateDetails;
  maxEntriesReached: boolean = false;
  isSameAddress: boolean = false;

  constructor(public loaderService: LoaderService,
    private candidateDetailsService: CandidateDetailsService) {
    this.addreslistFormGroup = new FormGroup({
      id: new FormControl(),
      type: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      addressLine1: new FormControl(null, Validators.required),
      addressLine2: new FormControl(null, Validators.required),
      zipOrPostalCode: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {

    this.candidateDetails = this.candidateDetailsService.candidateDetails
    if (this.candidateDetails?.addressList !== null) {
      this.dataSource = this.candidateDetails?.addressList!;
      if (this.dataSource?.length > 0) {
        this.isSameAddress = false;
      }
    }

    this.candidateDetailsService.candidateDetailsSubject.subscribe(
      candidateDetails => {
        this.candidateDetails = candidateDetails;
        if (candidateDetails?.addressList !== null) {
          this.dataSource = candidateDetails?.addressList!;
          if (this.dataSource?.length > 0) {
            this.isSameAddress = false;
          }
        }
      }
    );

    if (this.candidateDetails?.empId !== null) {
      this.showProgressBar = false;
    }

    if (this.dataSource) {
      if (this.dataSource.length >= 2) {
        this.maxEntriesReached = true;
      } else {
        this.maxEntriesReached = false;
      }
    }
  }

  get addressDataSource(): Address[] {
    return this.dataSource ?? [];
  }

  get addressFormControl() {
    return this.addreslistFormGroup.controls;
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000';
    }
  }

  addLine() {
    let address: Address = {
      type: this.addressFormControl.type.value,
      country: this.addressFormControl.country.value,
      state: this.addressFormControl.state.value,
      city: this.addressFormControl.city.value,
      addressLine1: this.addressFormControl.addressLine1.value,
      addressLine2: this.addressFormControl.addressLine2.value,
      zipOrPostalCode: this.addressFormControl.zipOrPostalCode.value
    };
    //this.dataSource?.push(address);
    if (this.isSameAddress === true) {
      this.dataSource?.push(address);
      let add: Address = { ...address };
      if (address.type.includes('Permanent')) {
        add.type = 'Communication Address';
      } else {
        add.type = 'Permanent Address';
      }
      this.dataSource?.push(add);
      if (this.candidateDetails) {
        this.candidateDetails.addressList = [];
        Object.assign(this.candidateDetails.addressList, this.dataSource);
        this.candidateDetailsService.updateCandidateDetails(this.candidateDetails);
        this.addreslistFormGroup.reset();
      }
    } else {
      this.dataSource?.push(address);
      this.candidateDetailsService.saveAddressDetails(address);
      this.addreslistFormGroup.reset();
    }

    if (this.dataSource) {
      if (this.dataSource.length >= 2) {
        this.maxEntriesReached = true;
      } else {
        this.maxEntriesReached = false;
      }
    }

  }

  removeLine(index: number) {
    if (this.dataSource) {
      this.candidateDetailsService.deleteAddressDetails(this.dataSource[index].id!);
      this.dataSource.splice(index, 1);
      this.isSameAddress = false;
      if (this.dataSource.length >= 2) {
        this.maxEntriesReached = true;
      } else {
        this.maxEntriesReached = false;
      }
    }
  }

}
