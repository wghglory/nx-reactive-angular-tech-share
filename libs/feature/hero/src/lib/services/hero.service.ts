import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, delay, map, Observable, of, share, shareReplay, switchMap } from 'rxjs';

import { heroMockResponse } from '../mock-data';
import { Hero } from '../models/hero.model';
import { MarvelResponse } from '../models/marvel.model';

const HERO_API = `${process.env['NX_MARVEL_URL']}/v1/public/characters`;

const LIMIT_LOW = 10;
const LIMIT_MID = 25;
const LIMIT_HIGH = 100;
const LIMITS = [LIMIT_LOW, LIMIT_MID, LIMIT_HIGH];

const DEFAULT_STATE = {
  search: '',
  page: 0,
  limit: LIMIT_MID,
};

interface HeroParam {
  apikey: string;
  limit: number;
  offset: number;
  nameStartsWith: string;
}

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient) {}

  limits = LIMITS;

  private stateBS = new BehaviorSubject(DEFAULT_STATE);

  search$ = this.stateBS.pipe(map(state => state.search));
  page$ = this.stateBS.pipe(map(state => state.page));
  limit$ = this.stateBS.pipe(map(state => state.limit));

  private changes$ = combineLatest([this.search$, this.page$, this.limit$]);

  private heroResponse$ = this.changes$.pipe(
    debounceTime(500),
    switchMap(([searchTerm, page, limit]) => {
      const params: Partial<HeroParam> = {
        apikey: process.env['NX_MARVEL_PUBLIC_KEY'] || '',
        limit,
        offset: page * limit,
      };
      if (searchTerm) {
        params.nameStartsWith = searchTerm;
      }

      // return of(heroMockResponse).pipe(
      //   delay(500),
      // );
      return this.http.get<MarvelResponse>(HERO_API, { params });
    }),
    shareReplay(1),
  );

  // derived states, like ngrx selector
  heroes$ = this.heroResponse$.pipe(map(res => res.data.results));
  totalResult$ = this.heroResponse$.pipe(map(res => res.data.total));
  totalPage$ = combineLatest([this.totalResult$, this.limit$]).pipe(map(([total, limit]) => Math.ceil(total / limit)));

  changeSearch(search: string) {
    this.stateBS.next({
      ...this.stateBS.value,
      search,
      page: 0,
    });
  }

  changePage(moveBy: number) {
    this.stateBS.next({
      ...this.stateBS.value,
      page: this.stateBS.value.page + moveBy,
    });
  }

  changeLimit(limit: number) {
    this.stateBS.next({
      ...this.stateBS.value,
      limit,
      page: 0,
    });
  }
}
