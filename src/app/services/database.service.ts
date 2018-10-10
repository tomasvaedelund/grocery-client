import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { IFamily } from '../models/IFamily';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private afs: AngularFirestore) {}

  updateUser(user: IUser): Promise<void> {
    return this.afs
      .doc<IUser>(`users/${user.uid}`)
      .update(user)
      .then()
      .catch(error => {
        this.afs.doc<IUser>(`users/${user.uid}`).set(user);
      });
  }
}
