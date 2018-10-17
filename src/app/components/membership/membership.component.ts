import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { UiService } from 'src/app/services/ui.service';

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
    private db: DatabaseService,
    private ui: UiService
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.groupsSubscription = this.db.getUserGroups(this.auth.currentUserId).subscribe(snap => {
      this.groups = snap;
      if (this.ui.isSpinning) {
        this.snackBar.open('Membership changes done', 'Close', {
          duration: 1000
        });
      }
      this.loading = false;
      this.ui.stopSpinner();
    });
  }

  createGroup(): void {
    if (
      this.groups &&
      this.groups.length > 0 &&
      this.groups.some(e => e.name.toLowerCase() === this.groupName.toLowerCase())
    ) {
      this.snackBar.open('No membership added, already exists', 'Close', {
        duration: 1000
      });
      return;
    }

    this.loading = true;
    this.ui.showSpinner();

    const group: IGroup = {
      name: this.groupName,
      createdBy: this.auth.currentUserId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    this.db.createGroup(group);
  }

  deleteMembership(membershipId: string): void {
    this.loading = true;
    this.ui.showSpinner();

    this.db.deleteMembership(membershipId);
  }

  ngOnDestroy(): void {
    this.groupsSubscription.unsubscribe();
  }
}
