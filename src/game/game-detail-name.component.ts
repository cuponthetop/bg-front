import { Component, OnInit, Input } from '@angular/core';

import { GameService } from './game.service';
import { Game, GameName } from './game.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'game-detail-name',
  template: `
    <div>
      <div><span>names</span> <span>{{game.getRepName()}}</span></div>
      <div *ngFor="let name of game.getNonRepNames()">
        <span>{{name.alias}} </span> <span>{{name.name}}</span>

        <button class="delete"
          (click)="delete(name.alias); $event.stopPropagation()">x</button>
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

  ngOnInit() { };

  delete(alias: string) {
    if (alias === 'base') {
      throw new Error('Cannot delete base alias name');
    } else {
      return this.gameService.removeGameProperty(this.game.id, 'name', alias);
    }
  };
};
