import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: firebase.User = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
  }

  // Returns true if user is logged in
  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): firebase.User {
    return this.isAuthenticated ? this.authState : null;
  }

  // Returns current user data as Observable
  get currentUserObservable(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : '';
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest';
    } else {
      return this.authState['displayName'] || 'User without a Name';
    }
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

  async signInWithEmailLink(
    email: string,
    url: string
  ): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailLink(email, url);
  }

  async logout(): Promise<void> {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
