import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading = new BehaviorSubject<boolean>(false);
  public isDarkTheme: boolean = localStorage.getItem('theme') === "Dark" ? true : false;
  constructor() { }
}
