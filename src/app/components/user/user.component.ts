import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import * as firebase from 'firebase/app';

import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { HttpService } from 'src/app/services/http.service';

import { IUser, IGroup, IGroupId } from 'src/app/models';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  displayName: string;
  email: string;

  loading: boolean;

  groupsSubscription: Subscription;
  groups: IGroupId[];

  groupName: string;

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

    this.groupsSubscription = this.db
      .getUserGroups(this.auth.currentUserId)
      .subscribe(snap => {
        this.groups = snap;
      });
  }

  addGroup(): void {
    if (
      this.groups.some(
        e => e.name.toLowerCase() === this.groupName.toLowerCase()
      )
    ) {
      this.snackBar.open('No group added, already exists', 'Close', {
        duration: 1000
      });
      return;
    }

    this.loading = true;

    const group: IGroup = {
      name: this.groupName,
      createdBy: this.auth.currentUserId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    this.db.createGroup(group).then(() => {
      this.loading = false;

      this.snackBar.open('Group added', 'Close', {
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

  ngOnDestroy(): void {
    this.groupsSubscription.unsubscribe();
  }
}
