import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HeroService } from './../../services/hero.service';

@Component({
  selector: 'rx-hero-list',
  templateUrl: './hero-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListComponent {
  // Benefits:
  // 1. less code in component
  // 2. performance due to changeDetection.OnPush
  // 3. when service changes to ngrx, component code doesn't need any change
  // 4. switchMap cancel previous requests
  constructor(public heroService: HeroService) {}

  heroes$ = this.heroService.heroes$;
}
