import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SharedModule } from '../shared/shared.module';
import { GameModule } from '../game/game.module';
import { UserModule } from '../user/user.module';
import { PriceModule } from '../price/price.module';
import { AppRoutingModule } from './app.route';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    GameModule,
    UserModule,
    PriceModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { };