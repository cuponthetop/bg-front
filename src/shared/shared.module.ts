import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ConfigService } from './config.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    // ConfigService
  ],
  exports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER, useFactory: (config: ConfigService) => () => config.load(), deps: [ConfigService], multi: true }
  ]
})
export class SharedModule { };