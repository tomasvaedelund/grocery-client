import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';

import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    OverlayModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    OverlayModule
  ],
  entryComponents: [MatSpinner]
})
export class MaterialModule {}
