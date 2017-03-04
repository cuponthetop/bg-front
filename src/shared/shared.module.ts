import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ConfigService } from './config.service';

@NgModule({
  imports: [
    HttpModule
  ],
  declarations: [
    ConfigService
  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER, useFactory: (config: ConfigService) => () => config.load(), deps: [ConfigService], multi: true }
  ]
})
export class SharedModule { };