import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav')
  sidenav: MatSidenav;

  opened: boolean;
  menuIcon: string;

  constructor(public auth: AuthService) {
    this.opened = false;
    this.menuIcon = 'menu';
  }

  toggle(): void {
    this.opened = !this.opened;
    this.menuIcon = this.opened ? 'close' : 'menu';
    this.sidenav.toggle();
  }

  close(): void {
    this.opened = false;
    this.menuIcon = 'menu';
    this.sidenav.close();
  }
}
