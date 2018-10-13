import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import * as firebase from 'firebase/app';

import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { HttpService } from 'src/app/services/http.service';

import { IUser, IUserGroupsResponse, IGroup } from 'src/app/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  displayName: string;
  email: string;

  loading: boolean;

  families: IGroup[];

  familyName: string;

  constructor(
    private auth: AuthService,
    public snackBar: MatSnackBar,
    private db: DatabaseService,
    private http: HttpService
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.displayName = this.auth.currentUserDisplayName;
    this.email = this.auth.currentUserEmail;

    // When server is done changing current users families then update the list;
    this.db
      .getUserMemberships(this.auth.currentUser)
      .snapshotChanges()
      .subscribe(() => {
        this.http.getUserFamilies(this.auth.currentUserId).subscribe(data => {
          this.families = (data as IUserGroupsResponse).groups;
        });
      });
  }

  addFamily(): void {
    if (
      this.families.some(
        e => e.name.toLowerCase() === this.familyName.toLowerCase()
      )
    ) {
      this.snackBar.open('No family added, already exists', 'Close', {
        duration: 1000
      });
      return;
    }

    this.loading = true;

    const family: IGroup = {
      name: this.familyName,
      createdBy: this.auth.currentUserId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    this.db.createGroup(family).then(() => {
      this.loading = false;

      this.snackBar.open('Family added', 'Close', {
        duration: 1000
      });
    });
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
}
