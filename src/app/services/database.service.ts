import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { Observable, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { IGroup, IMembership } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private afs: AngularFirestore) {}

  getUserMemberships(userId: string): AngularFirestoreCollection<IMembership> {
    const membershipCollection = this.afs.collection<IMembership>(`/memberships`, ref =>
      ref.where('userId', '==', userId)
    );

    return membershipCollection;
  }

  getUserGroups(userId: string): Observable<IGroup[]> {
    const membershipCollection = this.getUserMemberships(userId);

    const result$ = membershipCollection.valueChanges().pipe(
      switchMap(memberships => {
        if (memberships.length > 0) {
          const groups$ = memberships.map(membership => {
            return this.afs
              .doc<IGroup>(`/groups/${membership.groupId}`)
              .snapshotChanges()
              .pipe(
                map(groupSnap => {
                  const data = groupSnap.payload.data();
                  const id = groupSnap.payload.id;
                  return <IGroup>{ id, ...data };
                })
              );
          });
          return combineLatest(groups$);
        } else {
          return new Observable<IGroup[]>();
        }
      })
    );

    return result$;
  }

  getGroupDetails(groupId: string): AngularFirestoreDocument<IGroup> {
    const groupDocument = this.afs.doc<IGroup>(`/groups/${groupId}`);
    return groupDocument;
  }

  createGroup(group: IGroup): Promise<firebase.firestore.DocumentReference> {
    const groupsCollection = this.afs.collection<IGroup>(`groups`);
    return groupsCollection.add(group);
  }

  deleteGroup(groupId: string): Promise<void> {
    const groupDocument = this.afs.doc<IGroup>(`/groups/${groupId}`);
    return groupDocument.delete();
  }
}
