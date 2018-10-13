import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { Observable, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { IGroup, IMembership, IGroupId } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private afs: AngularFirestore) {}

  getUserMemberships(userId: string): AngularFirestoreCollection<IMembership> {
    return this.afs.collection<IMembership>(`/memberships`, ref =>
      ref.where('userId', '==', userId)
    );
  }

  getUserGroups(userId: string): Observable<IGroupId[]> {
    const membershipsRef = this.getUserMemberships(userId);

    const result = membershipsRef.valueChanges().pipe(
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
                  return <IGroupId>{ id, ...data };
                })
              );
          });
          return combineLatest(groups$);
        } else {
          return new Observable<IGroupId[]>();
        }
      })
    );

    return result;
  }

  getGroup(groupId: string): AngularFirestoreDocument<IGroup> {
    const group = this.afs.doc<IGroup>(`/groups/${groupId}`);
    return group;
  }

  createGroup(group: IGroup): Promise<firebase.firestore.DocumentReference> {
    const groupsRef = this.afs.collection<IGroup>(`groups`);
    return groupsRef.add(group);
  }
}
