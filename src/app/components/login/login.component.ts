import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  emailSent: boolean;

  errorMessage: string;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    const url = this.router.url;

    if (url.includes('signIn')) {
      this.confirmSignIn(url);
    }
  }

  async sendEmailLink(): Promise<void> {
    try {
      await this.auth.sendSignInLinkToEmail(
        this.email,
        environment.actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', this.email);
      this.emailSent = true;
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  async confirmSignIn(url: string): Promise<void> {
    try {
      if (this.auth.isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem('emailForSignIn');

        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        const result = await this.auth.signInWithEmailLink(email, url);
        window.localStorage.removeItem('emailForSignIn');

        // When successful login, redirect to home
        this.router.navigate(['/']);
      }
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  logout(): void {
    this.auth.logout();
  }
}
