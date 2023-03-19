import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Hero, HeroParamRaw } from '../../models/hero.model';
import { HeroImperativeService } from '../../services/hero-imperative.service';
import { LIMIT_MID, LIMITS } from '../../utils/const';

@Component({
  selector: 'rx-hero-list-imperative',
  templateUrl: './hero-list-imperative.component.html',
  styleUrls: ['./hero-list-imperative.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush, // usually won't work for imperative code
})
export class HeroListImperativeComponent implements OnInit, OnDestroy {
  constructor(private heroService: HeroImperativeService) {}

  private destroy$ = new Subject<void>();

  limits = LIMITS; // [10, 25, 100]

  searchTerm = '';
  page = 0;
  limit = LIMIT_MID; // default page limit is 25
  loading = false;

  heroes: Hero[] = [];
  totalPage = 0;
  totalResult = 0;

  get disablePrev() {
    return this.page === 0;
  }

  get disableNext() {
    return this.page + 1 === this.totalPage;
  }

  get userPage() {
    return this.page + 1;
  }

  private getHeroes(params: HeroParamRaw = { limit: LIMIT_MID, page: 0, searchTerm: '' }) {
    this.loading = true;

    // hard to handle race condition, such as cancel previous requests, no debounce
    this.heroService
      .getHeroes(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          // save data when successful
          this.heroes = res.data.results;
          this.totalResult = res.data.total;
          this.totalPage = Math.ceil(this.totalResult / this.limit);
          this.loading = false;
        },
        error: err => {
          console.log(err); // should display error in UI
          this.loading = false;
        },
      });
  }

  // every time when you search, not only saving searchTerm, but also call getHero explicitly
  // suppose we need another new input like advancedSearch, we'd have to refactor getHeroes
  changeSearch(searchTerm: string) {
    // these variables will make functions impure, effecting the output of the other functions
    this.searchTerm = searchTerm;
    this.page = 0;
    this.getHeroes({ limit: this.limit, page: this.page, searchTerm });
  }

  changePage(moveBy: number) {
    this.page = this.page + moveBy;
    this.getHeroes({ limit: this.limit, page: this.page, searchTerm: this.searchTerm });
  }

  changeLimit(limit: number) {
    this.limit = limit;
    this.page = 0;
    this.getHeroes({ limit, page: this.page, searchTerm: this.searchTerm });
  }

  ngOnInit() {
    this.getHeroes();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
