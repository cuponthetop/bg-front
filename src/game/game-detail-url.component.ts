import { Component, OnInit, Input } from '@angular/core';

import { GameService } from './game.service';
import { GamePage } from './game.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'game-detail-url',
  template: `
    <div>
      <div><span>urls</span></div>
      <div *ngFor="let url of urls">
        <span>{{url.market}} </span> <span>{{url.url}}</span>
      </div>
      <div>
      </div>
    </div>
    `
})
export class GameDetailURLComponent implements OnInit {
  @Input()
  urls: GamePage[];

  @Input()
  id: string;
  constructor(private gameService: GameService) { };

  ngOnInit() { };
};
