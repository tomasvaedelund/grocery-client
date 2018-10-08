import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayName: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.displayName = this.auth.currentUserDisplayName;
  }

}
