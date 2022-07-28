import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { routeTransitionAnimations } from './routing/route-transition-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations]
})
export class AppComponent {

  isLoading$ = new BehaviorSubject<boolean>(false);
  
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      this.navigationInterceptor(event as RouterEvent);
    });
  }

  private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.isLoading$.next(true);
    }
    if (event instanceof NavigationEnd) {
      this.isLoading$.next(false);
    }
    if (event instanceof NavigationCancel) {
      this.isLoading$.next(false);
    }
    if (event instanceof NavigationError) {
      this.isLoading$.next(false);
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
  }
}
