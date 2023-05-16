import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

interface Response {
    users: User[];
    limit: number;
    skip: number;
    total: number;
  }

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  url = "https://dummyjson.com/users";

  getUsers() {
    return this.http.get<Response>(this.url);
  }
}