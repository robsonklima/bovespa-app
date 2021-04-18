import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Config } from './../models/config';
import { Observable } from "rxjs/Observable";
import { User } from '../models/user';

@Injectable()
export class UserService {
  private user: User;

  constructor(
    private http: Http
  ) { }

  public login(user: User): Observable<User> {
    return this.http.get(`${Config.API_URL}login/${user.email}/${user.password}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  public getUser(user: User): Observable<User> {
    return this.http.get(`${Config.API_URL}users/${user.email}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  public postUser(user: User): Observable<User> {
    return this.http.post(`${Config.API_URL}users`, user)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}