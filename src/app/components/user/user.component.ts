import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { AuthService } from 'src/app/services/auth.service';

import { IUser } from 'src/app/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  displayName: string;
  email: string;

  loading: boolean;

  constructor(private auth: AuthService, public snackBar: MatSnackBar) {
    this.loading = false;
  }

  ngOnInit() {
    this.displayName = this.auth.currentUserDisplayName;
    this.email = this.auth.currentUserEmail;
  }

  get userName(): string {
    return this.displayName || this.email;
  }

  get isDisplayNameChanged(): boolean {
    return this.auth.currentUserDisplayName !== this.userName;
  }

  clearDisplayName(): void {
    this.displayName = '';
  }

  updateDisplayName(): void {
    if (!this.isDisplayNameChanged) {
      this.snackBar.open('Nothing to change', 'Close', {
        duration: 1000
      });
      return;
    }

    this.loading = true;

    const user: IUser = {
      uid: this.auth.currentUserId,
      displayName: this.displayName,
      email: this.email,
      photoURL: this.auth.currentUsePhotoURL
    };

    this.auth.updateUserData(user).then(() => {
      this.displayName = this.userName;
      this.loading = false;
      this.snackBar.open('New display name saved', 'Close', {
        duration: 1000
      });
    });
  }

  logout(): void {
    this.auth.logout();
  }

  ngOnDestroy(): void {}
}
