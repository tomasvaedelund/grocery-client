import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { AuthService } from './auth.service';

import { IGroup, IUser, IMembership } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private auth: AuthService, private afs: AngularFirestore) {}

  getUserMemberships(user: IUser): AngularFirestoreCollection<IMembership> {
    return this.afs.collection<IMembership>(`memberships`, ref =>
      ref.where('userId', '==', user.uid)
    );
  }

  createGroup(group: IGroup): Promise<firebase.firestore.DocumentReference> {
    const groupsRef = this.afs.collection<IGroup>(`groups`);
    return groupsRef.add(group);
  }
}
