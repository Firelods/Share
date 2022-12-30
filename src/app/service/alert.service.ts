import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (!this.keepAfterNavigationChange) {

          this.subject.next({});
        }
      }
    });
  }

  success(message: string, duration: number = 5000, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
    setTimeout(() => {
      this.clearAlertMessage();
    }, duration);
  }

  error(message: string, duration: number = 5000, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
    setTimeout(() => {
      this.clearAlertMessage();
    }, duration);
  }

  warning(message: string, duration: number = 5000, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'warning', text: message });
    setTimeout(() => {
      this.clearAlertMessage();
    }, duration);
  }

  info(message: string, duration: number = 5000, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'info', text: message });
    setTimeout(() => {
      this.clearAlertMessage();
    }, duration);
  }

  clearAlertMessage() {
    this.subject.next({});
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
