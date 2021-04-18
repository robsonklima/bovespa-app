import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Config } from './../models/config';
import { Observable } from "rxjs/Observable";
import { Stock } from '../models/stock';

@Injectable()
export class StockService {
  private stocks: Stock[] = [];

  constructor(
    private http: Http
  ) { }

  public getAll(): Observable<Stock[]> {
    return this.http.get(`${Config.API_URL}stocks`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}