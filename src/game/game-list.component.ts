import { Component, OnInit } from '@angular/core';

import { GameService } from './game.service';
import { Game } from './game.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'game-list',
  template: `
    <div *ngFor="let game of games | async">
      <game-list-item [game]="game"></game-list-item>

      <button class="delete"
        (click)="delete(game.id); $event.stopPropagation()">x</button>
    </div>
    <div>
      <label>Game name:</label> <input #gameName />
      <button (click)="add(gameName.value); gameName.value=''">
        Add
      </button>
    </div>
    `
})
export class GameListComponent implements OnInit {
  games: Observable<Game[]>;

  constructor(private gameService: GameService) { };

  ngOnInit() {
    this.games = this.gameService.getGames();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.gameService.createGame(name)
      .subscribe(game => {
      });
  }

  delete(id: string): void {
    this.gameService
      .deleteGame(id)
      .subscribe(() => {
      });
  }
};
