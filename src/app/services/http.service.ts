import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserFamiliesResponse } from '../models/IFamily';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private API_URL = 'https://us-central1-grocery-7a2cc.cloudfunctions.net';

  constructor(private http: HttpClient) {}

  getUserFamilies(userId: string) {
    return this.http.get<IUserFamiliesResponse>(
      `${this.API_URL}/getUserFamilies/${userId}/`
    );
  }
}
