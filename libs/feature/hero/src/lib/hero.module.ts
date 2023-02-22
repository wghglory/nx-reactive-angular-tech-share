import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { heroRoutes } from './lib.routes';
import { HeroListComponent } from './pages/hero-list/hero-list.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(heroRoutes)],
  declarations: [HeroListComponent],
})
export class HeroModule {}
