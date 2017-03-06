import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfigService } from './config.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [
    // ConfigService
  ],
  exports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER, useFactory: (config: ConfigService) => () => config.load(), deps: [ConfigService], multi: true }
  ]
})
export class SharedModule { };