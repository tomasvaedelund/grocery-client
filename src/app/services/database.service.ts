import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { IFamily, IFamilyId } from '../models/IFamily';
import { IUser } from '../models/IUser';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private auth: AuthService, private afs: AngularFirestore) {}

  getUserFamilies(user: IUser): AngularFirestoreCollection<IFamily> {
    return this.afs.collection<IFamily>(`users/${user.uid}/families`);
  }

  addFamily(family: IFamily): Promise<firebase.firestore.DocumentReference> {
    const familiesRef = this.afs.collection<IFamily>(`families`);
    return familiesRef.add(family);
  }
}
