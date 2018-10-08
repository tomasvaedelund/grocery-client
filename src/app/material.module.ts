import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  exports: [MatToolbarModule, MatIconModule, MatButtonModule]
})
export class MaterialModule {}
