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
        <game-detail-name [game]="game"></game-detail-name">
      </div>
      <div>
        <game-detail-term [terms]="game.searchTerms" [id]="game.id"></game-detail-term">
      </div>
      <div>
        <game-detail-url [urls]="game.urls" [id]="game.id"></game-detail-url">
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
};
