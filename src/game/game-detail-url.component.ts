import { Component, OnInit, Input } from '@angular/core';

import { GameService } from './game.service';
// TODO:: MARKETS should be moved to its own service
import { Game, GamePage, MARKETS } from './game.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'game-detail-url',
  template: `
    <div>
      <div><span>urls</span></div>
      <div *ngFor="let url of game.urls">
        <span>{{url.market}} </span> <span>{{url.url}}</span>

        <button class="delete"
          (click)="delete(term.market); $event.stopPropagation()">x</button>
      </div>
      <div>
      </div>
    </div>
    `
})
export class GameDetailURLComponent implements OnInit {
  @Input()
  game: Game;

  constructor(private gameService: GameService) { };

  ngOnInit() { };

  delete(market: string) {
    return this.gameService.removeGameProperty(this.game.id, 'url', market);
  };
};
