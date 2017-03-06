import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes = [{
  path: '',
  redirectTo: '/games',
  pathMatch: 'full'
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