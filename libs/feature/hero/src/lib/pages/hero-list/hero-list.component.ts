import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';

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
  constructor(private heroService: HeroService) {}

  // View Model to avoid too many async pipe in template
  vm$ = combineLatest([
    this.heroService.heroes$,
    this.heroService.search$,
    this.heroService.page$,
    this.heroService.limit$,
    this.heroService.totalPage$,
    this.heroService.totalResult$,
  ]).pipe(
    map(([heroes, search, page, limit, totalPage, totalResult]) => {
      return {
        heroes,
        search,
        page,
        limit,
        userPage: page + 1,
        totalPage,
        totalResult,
        disablePrev: page === 0,
        disableNext: page + 1 === totalPage,
        limits: this.heroService.limits,
      };
    }),
  );

  changeSearch(searchTerm: string) {
    this.heroService.changeSearch(searchTerm);
  }

  changePage(moveBy: number) {
    this.heroService.changePage(moveBy);
  }

  changeLimit(limit: number) {
    this.heroService.changeLimit(limit);
  }
}
