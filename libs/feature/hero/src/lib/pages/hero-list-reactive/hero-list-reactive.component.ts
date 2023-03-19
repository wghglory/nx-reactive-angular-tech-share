import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import { HeroReactiveService } from '../../services/hero-reactive.service';
import { LIMITS } from '../../utils/const';

@Component({
  selector: 'rx-hero-list-reactive',
  templateUrl: './hero-list-reactive.component.html',
  providers: [HeroReactiveService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListReactiveComponent {
  // Benefits:
  // 1. less code in component
  // 2. performance due to changeDetection.OnPush
  // 3. when service changes to ngrx, component code doesn't need any change
  // 4. switchMap cancel previous requests
  constructor(private heroService: HeroReactiveService) {}

  // View Model to avoid too many async pipe in template
  vm$ = combineLatest([
    this.heroService.heroes$,
    this.heroService.search$,
    this.heroService.page$,
    this.heroService.limit$,
    this.heroService.totalPage$,
    this.heroService.totalResult$,
    this.heroService.loading$,
  ]).pipe(
    map(([heroes, search, page, limit, totalPage, totalResult, loading]) => {
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
        limits: LIMITS,
        loading,
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
