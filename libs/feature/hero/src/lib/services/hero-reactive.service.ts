import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEqual } from 'lodash';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

import { HeroParam } from '../models/hero.model';
import { MarvelResponse } from '../models/marvel.model';
import { HERO_API, LIMIT_MID, LIMITS } from '../utils/const';

const DEFAULT_STATE = { search: '', page: 0, limit: LIMIT_MID };

@Injectable()
export class HeroReactiveService {
  constructor(private http: HttpClient) {}

  limits = LIMITS;

  private stateBS = new BehaviorSubject(DEFAULT_STATE);
  private loadingBS = new BehaviorSubject(true);

  search$ = this.stateBS.pipe(map(state => state.search));
  page$ = this.stateBS.pipe(map(state => state.page));
  limit$ = this.stateBS.pipe(map(state => state.limit));
  loading$ = this.loadingBS.asObservable();

  private changes$ = combineLatest([this.search$.pipe(map(search => search.trim())), this.page$, this.limit$]);

  private heroResponse$ = this.changes$.pipe(
    debounceTime(500),
    distinctUntilChanged(isEqual),
    tap(() => this.loadingBS.next(true)),
    switchMap(([searchTerm, page, limit]) => {
      const params: Partial<HeroParam> = {
        apikey: process.env['NX_MARVEL_PUBLIC_KEY'] || '',
        limit,
        offset: page * limit,
      };
      if (searchTerm) {
        params.nameStartsWith = searchTerm;
      }

      // return of(heroMockResponse).pipe(delay(500));
      return this.http.get<MarvelResponse>(HERO_API, { params }).pipe(finalize(() => this.loadingBS.next(false)));
    }),
    shareReplay(1),
  );

  // derived states, like ngrx selector
  heroes$ = this.heroResponse$.pipe(
    map(res => res.data.results),
    startWith([]),
  );
  totalResult$ = this.heroResponse$.pipe(
    map(res => res.data.total),
    startWith(0),
  );
  totalPage$ = combineLatest([this.totalResult$, this.limit$]).pipe(
    map(([total, limit]) => Math.ceil(total / limit)),
    startWith(0),
  );

  changeSearch(search: string) {
    this.stateBS.next({ ...this.stateBS.value, search, page: 0 });
  }

  changePage(moveBy: number) {
    this.stateBS.next({ ...this.stateBS.value, page: this.stateBS.value.page + moveBy });
  }

  changeLimit(limit: number) {
    this.stateBS.next({ ...this.stateBS.value, limit, page: 0 });
  }
}
