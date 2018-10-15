import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

import { IGroup } from 'src/app/models';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit, OnDestroy {
  loading: boolean;

  groupsSubscription: Subscription;
  groups: IGroup[];

  groupName: string;

  constructor(
    private auth: AuthService,
    public snackBar: MatSnackBar,
    private db: DatabaseService
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.groupsSubscription = this.db.getUserGroups(this.auth.currentUserId).subscribe(snap => {
      this.groups = snap;
      this.loading = false;
    });
  }

  createGroup(): void {
    if (
      this.groups &&
      this.groups.length > 0 &&
      this.groups.some(e => e.name.toLowerCase() === this.groupName.toLowerCase())
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

  deleteMembership(membershipId: string): void {
    this.db.deleteMembership(membershipId);
  }

  ngOnDestroy(): void {
    this.groupsSubscription.unsubscribe();
  }
}
