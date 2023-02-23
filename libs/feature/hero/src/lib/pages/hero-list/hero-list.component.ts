import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Hero } from '../../models/hero.model';
import { HeroService } from './../../services/hero.service';

@Component({
  selector: 'rx-hero-list',
  templateUrl: './hero-list.component.html',
})
export class HeroListComponent implements OnInit, OnDestroy {
  constructor(public heroService: HeroService) {}

  heroes: Hero[] = [];
  searchTerm = '';
  destroyer$ = new Subject<void>();

  ngOnInit() {
    this.heroService
      .getHeroes()
      .pipe(takeUntil(this.destroyer$))
      .subscribe(res => {
        this.heroes = res;
      });
  }

  doSearch(searchTerm: string) {
    this.heroService
      .getHeroes(searchTerm)
      .pipe(takeUntil(this.destroyer$))
      .subscribe(res => {
        this.heroes = res;
      });
  }

  ngOnDestroy() {
    this.destroyer$.next();
    this.destroyer$.complete();
  }
}
