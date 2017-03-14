import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../shared/config.service';
import { Observable, Subscription, ReplaySubject } from 'rxjs';

import { Game, GameName, GamePage, SearchTerm } from './game.model';

import * as _ from 'lodash';

@Injectable()
export class GameService {

  constructor(private http: Http, private config: ConfigService) { };

  getGames(): Observable<Game[]> {
    return this.http.get('http://localhost:3003/v1/game/games/')
      .map(response => response ? response.json() as Game[] : Observable.of<Game[]>([]));
  };

  getGame(id: string): Observable<Game> {
    return this.http.get(`http://localhost:3003/v1/game/game/${id}`)
      .map(response => response.json() as Game);
  };

  deleteGame(id: string): Observable<string> {
    return this.http.delete(`http://localhost:3003/v1/game/game/${id}`)
      .map(response => response.json() as string);
  };

  createGame(name: string): Observable<Game> {
    let param = {
      gamename: name
    };

    return this.http.post(`http://localhost:3003/v1/game/game/`, param)
      .map(response => response.json() as string)
      .flatMap(id => this.getGame(id));
  };

  // updateGame(name: string): Observable<Game> {

  // };

  addGameProperty(id: string, propertyType: 'name' | 'url' | 'searchterm', propertyValue: GameName | SearchTerm | GamePage)
    : Observable<GameName[] | SearchTerm[] | GamePage[]> {
    let url = `http://localhost:3003/v1/game/game/${id}/${propertyType}`;
    let bodyObj = null;
    switch (propertyType) {
      case 'name': {
        bodyObj = {
          gamename: _.get(propertyValue, 'name', ''),
          alias: _.get(propertyValue, 'alias', '')
        };
        break;
      }
      case 'searchterm': {
        bodyObj = {
          type: _.get(propertyValue, 'market', ''),
          term: _.get(propertyValue, 'terms[0]', '')
        };
        break;
      }
      case 'url': {
        bodyObj = {
          url: _.get(propertyValue, 'url', ''),
          type: _.get(propertyValue, 'market', '')
        };
        break;
      }
      default: {
        throw new Error(`Unsupported property type ${propertyType} `);
      }
    }
    return this.http.patch(url, bodyObj)
      .map(response => response.json() as GameName[] | SearchTerm[] | GamePage[]);
  };

  removeGameProperty(id: string, propertyType: 'name' | 'url' | 'searchterm', removeKey: string)
    : Observable<GameName | SearchTerm | GamePage> {
    let url = `http://localhost:3003/v1/game/game/${id}/${propertyType}/${removeKey}`;
    switch (propertyType) {
      case 'name':
      case 'searchterm':
      case 'url': {
        break;
      }
      default: {
        throw new Error(`Unsupported property type ${propertyType} `);
      }
    }
    return this.http.delete(url)
      .map(response => response.json() as GameName | SearchTerm | GamePage);
  };
};