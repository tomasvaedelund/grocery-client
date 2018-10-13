import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserGroupsResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private API_URL = 'https://us-central1-grocery-7a2cc.cloudfunctions.net';

  constructor(private http: HttpClient) {}

  getUserGroups(userId: string) {
    return this.http.get<IUserGroupsResponse>(
      `${this.API_URL}/getUserGroups/${userId}/`
    );
  }
}
