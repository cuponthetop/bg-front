import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../shared/config.service';
import { Observable, Subscription, ReplaySubject } from 'rxjs';

@Injectable()
export class GameService {

  constructor(private http: Http, private config: ConfigService) { };

};