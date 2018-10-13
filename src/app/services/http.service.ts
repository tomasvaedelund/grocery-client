import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { IUserGroupsResponse } from '../models';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private API_URL = environment.apiSettings.apiUrl;

  constructor(private http: HttpClient) {}

  // getUserGroups(userId: string) {
  //   return this.http.get<IUserGroupsResponse>(
  //     `${this.API_URL}/getUserGroups/${userId}/`
  //   );
  // }
}
