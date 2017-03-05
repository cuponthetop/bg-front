import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from '../game/game.component';
import { GameDetailComponent } from '../game/game-detail.component';

const routes = [{
  path: '',
  redirectTo: '/games',
  pathMatch: 'full'
}, {
  path: 'games',
  component: GameComponent
}, {
  path: 'game/:gameid',
  component: GameDetailComponent
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { };