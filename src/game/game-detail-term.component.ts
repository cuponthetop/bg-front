import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GameService } from './game.service';
// TODO:: MARKETS should be moved to its own service
import { Game, SearchTerm, MARKETS, getPossibleNewMarketsForTerm } from './game.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'game-detail-term',
  template: `
    <div>
      <div><span>search terms</span></div>
      <div *ngFor="let term of game?.searchTerms">
        <span>{{term.market}} </span> <span *ngFor="let termEl of term.terms">{{termEl}}</span>

        <button class="delete"
          (click)="delete(term.market); $event.stopPropagation()">x</button>
      </div>
      <div>
        <form [formGroup]="termForm">
          <select formControlName="market">
            <option *ngFor="let market of getPossibleNewMarketsForTerm()" [value]="market">{{market}}</option>
          </select>
          <label>TermToAdd:
            <input formControlName="newTerm">
          </label>
        </form>
      </div>
    </div>
    `
})
export class GameDetailTermComponent implements OnInit {
  @Input()
  game: Game;

  termForm: FormGroup;

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.createForm();
  };


  ngOnInit() { };

  createForm() {
    this.termForm = this.fb.group({
      newTerm: ['', Validators.required],
      market: '',
    });
  };

  delete(market: string) {
    return this.gameService.removeGameProperty(this.game.id, 'searchterm', market);
  };

  getPossibleNewMarketsForTerm(): string[] {
    return getPossibleNewMarketsForTerm(this.game);
  };
};
