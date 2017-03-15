import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GameService } from './game.service';
// TODO:: MARKETS should be moved to its own service
import { Game, SearchTerm, MARKETS, getPossibleNewMarketsForTerm } from './game.model';

import { Observable } from 'rxjs';

import * as _ from 'lodash';

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

          <button class="create" type="button"
            (click)="create(); $event.stopPropagation()">+</button>
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


  create() {
    let term: string = this.termForm.get('newTerm').value;
    let market: string = this.termForm.get('market').value;
    let toAdd: SearchTerm = new SearchTerm();
    toAdd.terms = [term];
    toAdd.market = market;

    return this.gameService.addGameProperty(this.game.id, 'searchterm', toAdd)
      .subscribe(searchTerms => this.game.searchTerms = searchTerms as SearchTerm[]);
  };

  delete(market: string) {
    return this.gameService.removeGameProperty(this.game.id, 'searchterm', market)
      .subscribe((removed: SearchTerm) => {
        _.remove(this.game.searchTerms, (el: SearchTerm) => el.market === removed.market);
      });
  };

  getPossibleNewMarketsForTerm(): string[] {
    return getPossibleNewMarketsForTerm(this.game);
  };
};
