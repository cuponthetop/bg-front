import { Component, OnInit, Input } from '@angular/core';

import { GameService } from './game.service';
import { SearchTerm } from './game.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'game-detail-term',
  template: `
    <div>
      <div><span>search terms</span></div>
      <div *ngFor="let term of game.searchTerms">
        <span>{{term.market}} </span> <span>{{term.terms}}</span>
      </div>
      <div>
      </div>
    </div>
    `
})
export class GameDetailTermComponent implements OnInit {
  @Input()
  terms: SearchTerm[];

  constructor(private gameService: GameService) { };

  ngOnInit() { };
};
