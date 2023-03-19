import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { SpinnerComponent } from '@rx/shared/ui';

import { heroRoutes } from './lib.routes';
import { HeroListImperativeComponent } from './pages/hero-list-imperative/hero-list-imperative.component';
import { HeroListReactiveComponent } from './pages/hero-list-reactive/hero-list-reactive.component';
import { HeroBadgeComponent } from './ui/hero-badge/hero-badge.component';

@NgModule({
  imports: [CommonModule, ClarityModule, SpinnerComponent, RouterModule.forChild(heroRoutes)],
  declarations: [HeroListReactiveComponent, HeroBadgeComponent, HeroListImperativeComponent],
})
export class HeroModule {}
