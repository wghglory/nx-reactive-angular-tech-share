import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { heroRoutes } from './lib.routes';
import { HeroListComponent } from './pages/hero-list/hero-list.component';
import { HeroBadgeComponent } from './ui/hero-badge/hero-badge.component';

@NgModule({
  imports: [CommonModule, ClarityModule, RouterModule.forChild(heroRoutes)],
  declarations: [HeroListComponent, HeroBadgeComponent],
})
export class HeroModule {}
