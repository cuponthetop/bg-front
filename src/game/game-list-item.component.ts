import { Component, OnInit, Input } from '@angular/core';
import { Game } from './game.model';

@Component({
  selector: 'game-list-item',
  template: `
    <div>
      <a [routerLink]="['/game', game.id]" >{{ game.getRepName() }}</a>
    </div>
    `
})
export class GameListItemComponent implements OnInit {
  @Input()
  game: Game = null;

  constructor() { };

  ngOnInit() {

  };

};
