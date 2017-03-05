import { Component, OnInit, Input } from '@angular/core';

import { GameService } from './game.service';
import { Game } from './game.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'game-detail-name',
  template: `
      <div>
        <div><span>names</span> <span>{{game.getRepName()}}</span></div>
        <div *ngFor="let name of game.gamenames">
          <span>{{name.alias}} </span> <span>{{name.name}}</span>
        </div>
        <div>
        </div>
      </div>
    `
})
export class GameDetailNameComponent implements OnInit {
  @Input()
  game: Game;

  constructor(private gameService: GameService) { };

  ngOnInit() {  };
};
