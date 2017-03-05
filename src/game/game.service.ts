import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../shared/config.service';
import { Observable, Subscription, ReplaySubject } from 'rxjs';

import { Game } from './game.model';

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

    return this.http.post(`http://localhost:3003/v1/game/game/`, param)
      .map(response => response.json() as string)
      .flatMap(id => this.getGame(id));
  };

  // updateGame(name: string): Observable<Game> {

  // };
};