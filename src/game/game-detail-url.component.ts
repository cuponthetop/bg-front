import { Component, OnInit, Input } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameService } from './game.service';
// TODO:: MARKETS should be moved to its own service
import { Game, GamePage, MARKETS, getPossibleNewMarketsForURL } from './game.model';

import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'game-detail-url',
  template: `
    <div>
      <div><span>urls</span></div>
      <div *ngFor="let url of game?.urls">
        <span>{{url.market}} </span> <span>{{url.url}}</span>

        <button class="delete" type="button"
          (click)="delete(url.market); $event.stopPropagation()">x</button>
      </div>
      <div>
        <form [formGroup]="urlForm">
          <label>URLToAdd:
            <input formControlName="newURL">
          </label>

          <button class="create" type="button"
            (click)="create(); $event.stopPropagation()">+</button>
        </form>
      </div>
    </div>
    `
})
export class GameDetailURLComponent implements OnInit {
  @Input()
  game: Game;

  urlForm: FormGroup;

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.createForm();
  };

  ngOnInit() { };

  createForm() {
    this.urlForm = this.fb.group({
      newURL: ['', Validators.required]
    });
  };

  create() {
    let url = this.urlForm.get('newURL').value;
    let market: string = this.extractMarketFromURL(url);
    let toAdd: GamePage = new GamePage();
    toAdd.url = url;
    toAdd.market = market;

    return this.gameService.addGameProperty(this.game.id, 'url', toAdd);
  };

  delete(market: string) {
    return this.gameService.removeGameProperty(this.game.id, 'url', market);
  };

  getPossibleNewMarketsForURL(): string[] {
    return getPossibleNewMarketsForURL(this.game);
  };

  extractMarketFromURL(url: string): string {
    let extracted = url.match(/^(?:https?:\/\/)?(?:www\.)?([^:\/\n\.]+)(?:\.[a-z]*)/);
    if (extracted.length === 0) {
      throw new Error('given url is not of proper http webpage url');
    }
    let domain = _.toLower(extracted[0]);

    switch (domain) {
      case 'amazon':
      case 'cardhaus':
      case 'cardcastle':
      case 'boardpia':
        {
          return domain[0].toUpperCase() + domain.substr(1).toLowerCase();
        }
      case 'miniaturemarket': {
        return 'MiniatureMarket';
      }
      case 'coolstuffinc': {
        return 'CoolStuffInc';
      }
      case 'boardm': {
        return 'BoardM';
      }
      case 'divedice': {
        return 'DiveDice';
      }
      case 'popcone': {
        return 'PopcornEdu';
      }
      default: {
        throw new Error('Extracted Market is not recognizable');
      }
    };
  };
};

