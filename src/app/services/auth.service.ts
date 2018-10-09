import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: firebase.User = null;
  user: Observable<IUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    });

    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): firebase.User {
    return this.authenticated ? this.authState : null;
  }

  // Returns current user data as Observable
  // This is called in the AuthGuard and thus makes sure that this.authState is always set
  get currentUserObservable(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Returns current user display name or email
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest';
    } else {
      return this.authState['displayName'] || this.authState.email;
    }
  }

  get currentUserEmail(): string {
    return this.authState['email'];
  }

  async sendSignInLinkToEmail(
    email: string,
    actionCodeSettings: firebase.auth.ActionCodeSettings
  ): Promise<void> {
    return this.afAuth.auth.sendSignInLinkToEmail(email, actionCodeSettings);
  }

  isSignInWithEmailLink(url: string): boolean {
    return this.afAuth.auth.isSignInWithEmailLink(url);
  }

  updateUserData(user: IUser): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }

  private updateUserDataFromFirebaseUser(user: firebase.User): Promise<void> {
    const data: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };

    return this.updateUserData(data);
  }

  async signInWithEmailLink(email: string, url: string): Promise<void> {
    return this.afAuth.auth.signInWithEmailLink(email, url).then(credential => {
      this.updateUserDataFromFirebaseUser(credential.user);
    });
  }

  logout(): void {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
