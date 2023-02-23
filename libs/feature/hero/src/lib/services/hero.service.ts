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

const DEFAULT_LIMIT = LIMIT_MID;
const DEFAULT_SEARCH = '';
const DEFAULT_PAGE = 0;

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

  private searchBS = new BehaviorSubject(DEFAULT_SEARCH);
  private pageBS = new BehaviorSubject(DEFAULT_PAGE);
  private limitBS = new BehaviorSubject(DEFAULT_LIMIT);

  search$ = this.searchBS.asObservable();
  page$ = this.pageBS.asObservable();
  userPage$ = this.page$.pipe(map(page => page + 1));
  limit$ = this.limitBS.asObservable();

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

  changeSearch(searchTerm: string) {
    // like ngrx dispatch an action, or react setState() but without batch update
    this.searchBS.next(searchTerm);
    this.pageBS.next(0);
  }

  changePage(moveBy: number) {
    this.pageBS.next(this.pageBS.value + moveBy);
  }

  changeLimit(limit: number) {
    this.limitBS.next(limit);
    this.pageBS.next(0);
  }
}
