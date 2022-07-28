import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-intro-dialog',
  templateUrl: './intro-dialog.component.html',
  styleUrls: ['./intro-dialog.component.scss']
})
export class IntroDialogComponent implements OnInit {
  isDarkTheme: boolean = false;
  activeImg = 1;

  @Output() emitService = new EventEmitter();

  constructor(private loaderService: LoaderService,) { }

  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false;
    this.loaderService.isDarkTheme = this.isDarkTheme;
    sessionStorage.setItem("introductionVisited", "Visited");
  }


  goToIndex(index: any) {
    if (index === this.activeImg) {
    }
    else {
      this.activeImg = index;
    }
  }

  changeIndex(position: any) {
    if (position === -1 && this.activeImg === 1) {
    }
    else if (position === 1 && this.activeImg === 3) {
    }
    else {
      this.activeImg = this.activeImg + position;
    }
  }

  skip() {
    this.emitService.emit(true);
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000';
    }
  }

}
