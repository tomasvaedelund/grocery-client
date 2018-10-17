import { Injectable } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material';
import { Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // https://medium.com/@velenra/using-angular-material-spinner-with-cdk-overlay-8ab92bfbafee

  private spinnerRef: OverlayRef = this.cdkSpinnerCreate();

  spin$: Subject<boolean> = new Subject();

  constructor(private overlay: Overlay) {
    this.spin$
      .asObservable()
      .pipe(
        map(val => (val ? 1 : -1)),
        scan((acc, one) => (acc + one >= 0 ? acc + one : 0), 0)
      )
      .subscribe(res => {
        if (res === 1) {
          return this.showSpinner();
        } else if (res === 0) {
          return this.spinnerRef.hasAttached() ? this.stopSpinner() : null;
        }
      });
  }

  get isSpinning(): boolean {
    return this.spinnerRef.hasAttached();
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
  }

  showSpinner() {
    this.spinnerRef.attach(new ComponentPortal(MatSpinner));
  }

  stopSpinner() {
    this.spinnerRef.detach();
  }
}
