import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule} from '@angular/router';


import { GameService } from './game.service';

import { GameRoutingModule } from './game.route';

import { GameComponent } from './game.component';
import { GameListComponent } from './game-list.component';
import { GameListItemComponent } from './game-list-item.component';
import { GameDetailComponent } from './game-detail.component';
import { GameDetailNameComponent } from './game-detail-name.component';
import { GameDetailTermComponent } from './game-detail-term.component';
import { GameDetailURLComponent } from './game-detail-url.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    GameRoutingModule
  ],
  declarations: [
    GameComponent,
    GameListComponent,
    GameListItemComponent,
    GameDetailComponent
  ],
  providers: [
    GameService
  ]
})
export class GameModule { };