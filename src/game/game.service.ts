import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../shared/config.service';
import { Observable, Subscription, ReplaySubject } from 'rxjs';

import { Game, GameName, GamePage, SearchTerm } from './game.model';

@Injectable()
export class GameService {

  constructor(private http: Http, private config: ConfigService) { };

  getGames(): Observable<Game[]> {
    return this.http.get('http://localhost:3003/v1/game/games/').map(response => response.json() as Game[]);
  };

  getGame(id: string): Observable<Game> {
    return this.http.get(`http://localhost:3003/v1/game/game/${id}`).map(response => response.json() as Game);
  };

  deleteGame(id: string): Observable<string> {
    return this.http.delete(`http://localhost:3003/v1/game/game/${id}`).map(response => response.json() as string);
  };

  createGame(name: string): Observable<Game> {
    let param = {
      gamename: name,
      gamenameEn: name,
      gamenameKr: name
    };

    return this.http.patch(`http://localhost:3003/v1/game/game/`, param)
      .map(response => response.json() as string)
      .flatMap(id => this.getGame(id));
  };

  // updateGame(name: string): Observable<Game> {

  // };

  addGameProperty(id: string, propertyType: 'name' | 'url' | 'searchterm', propertyValue: GameName | SearchTerm | GamePage)
    : Observable<GameName[] | SearchTerm[] | GamePage[]> {
    let url = `http://localhost:3003/v1/game/game/${id}/`;
    switch (propertyType) {
      case 'name':
      case 'searchterm':
      case 'url': {
        url = url + propertyType;
        break;
      }
      default: {
        throw new Error(`Unsupported property type ${propertyType} `);
      }
    }
    return this.http.post(url, propertyValue).map(response => response.json() as GameName[] | SearchTerm[] | GamePage[]);
  };

  removeGameProperty(id: string, propertyType: 'name' | 'url' | 'searchterm', removeKey: string)
    : Observable<GameName | SearchTerm | GamePage> {
    let url = `http://localhost:3003/v1/game/game/${id}`;
    switch (propertyType) {
      case 'name':
      case 'searchterm':
      case 'url': {
        url = `${url}/${propertyType}/${removeKey}`;
        break;
      }
      default: {
        throw new Error(`Unsupported property type ${propertyType} `);
      }
    }
    return this.http.delete(url).map(response => response.json() as GameName | SearchTerm | GamePage);
  };
};