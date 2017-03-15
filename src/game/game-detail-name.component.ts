import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GameService } from './game.service';
import { Game, GameName, getRepName, getNonRepNames } from './game.model';

import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'game-detail-name',
  template: `
    <div>
      <div><span>names</span> <span>{{getRepName()}}</span></div>
      <div *ngFor="let name of getNonRepNames()">
        <span>{{name.alias}} </span> <span>{{name.name}}</span>

        <button class="delete"
          (click)="delete(name.alias); $event.stopPropagation()">x</button>
      </div>
      <div>
        <form [formGroup]="nameForm">
          <label>Alias:
            <input formControlName="alias">
          </label>

          <label>Name:
            <input formControlName="newName">
          </label>

          <button class="create" type="button"
            (click)="create(); $event.stopPropagation()">+</button>
        </form>
      </div>
    </div>
    `
})
export class GameDetailNameComponent implements OnInit {
  @Input()
  game: Game;

  nameForm: FormGroup;

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.createForm();
  };

  ngOnInit() { };

  createForm() {
    this.nameForm = this.fb.group({
      newName: ['', Validators.required],
      alias: ['', Validators.required],
    });
  };

  create() {
    let alias: string = this.nameForm.get('alias').value;
    let newName: string = this.nameForm.get('newName').value;
    let toAdd: GameName = new GameName();
    toAdd.alias = alias;
    toAdd.name = newName;

    return this.gameService.addGameProperty(this.game.id, 'name', toAdd)
      .subscribe(names => this.game.gamenames = names as GameName[]);
  };

  delete(alias: string) {
    if (alias === 'base') {
      throw new Error('Cannot delete base alias name');
    } else {
      return this.gameService.removeGameProperty(this.game.id, 'name', alias).subscribe((removed: GameName) => {
        _.remove(this.game.gamenames, (el: GameName) => el.alias === removed.alias);
      });
    }
  };

  getRepName(): string {
    return getRepName(this.game);
  };

  getNonRepNames(): GameName[] {
    return getNonRepNames(this.game);
  };
};
