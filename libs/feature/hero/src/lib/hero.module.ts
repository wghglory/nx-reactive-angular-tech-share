import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { heroRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(heroRoutes)],
})
export class HeroModule {}
