import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription, ReplaySubject } from 'rxjs';

@Injectable()
export class ConfigService {

  private config: ReplaySubject<any> = null;
  private sub: Subscription = null;

  get config$(): Observable<any> {
    return this.config;
  }

  constructor(private http: Http) {
    this.config = new ReplaySubject<any>(1);
  };

  load(): void {
    this.sub = this.http.get('config/config.json')
      .map((res) => { return res.json() })
      .catch((error: any): any => {
        console.log('Configuration file "config.json" could not be read');
        return Observable.throw(error.json().error || 'Server error');
      }).subscribe((config) => {
        this.config.next(config);
      });
  }
};