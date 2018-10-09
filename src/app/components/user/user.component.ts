import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material';

import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/IUser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
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

  clearDisplayName(): void {
    console.log('cleared');
    this.displayName = '';
  }

  updateDisplayName(): void {
    this.loading = true;

    const user: IUser = {
      uid: this.auth.currentUserId,
      displayName: this.displayName,
      email: this.email
    };

    this.auth.updateUserData(user).then(() => {
      this.loading = false;
      this.displayName = this.userName;
      this.snackBar.open('New display name saved', 'Close', {
        duration: 1000
      });
    });
  }

  logout(): void {
    this.auth.logout();
  }
}
