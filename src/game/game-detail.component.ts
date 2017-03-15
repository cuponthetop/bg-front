import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { GameService } from './game.service';
import { Game } from './game.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'game-detail',
  template: `
    <div>
      <div>
        <game-detail-name [game]="game"></game-detail-name>
      </div>
      <div>
        <game-detail-term [game]="game"></game-detail-term>
      </div>
      <div>
        <game-detail-url [game]="game"></game-detail-url>
      </div>
      <div>
        <button (click)="goBack()">Back</button>
      </div>
    </div>
    `
})
export class GameDetailComponent implements OnInit {
  game: Game;

  constructor(private gameService: GameService, private route: ActivatedRoute, private location: Location) { };

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.gameService.getGame(params['gameid']))
      .subscribe(game => this.game = game);
  };

  goBack(): void {
    this.location.back();
  };
};
