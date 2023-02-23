import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, delay, map, Observable, of, switchMap } from 'rxjs';

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
  private page$ = this.pageBS.asObservable();
  userPage$ = this.page$.pipe(map(page => page + 1));
  limit$ = this.limitBS.asObservable();

  private changes$ = combineLatest([this.search$, this.page$, this.limit$]).pipe();

  heroes$ = this.changes$.pipe(
    switchMap(([searchTerm, page, limit]) => {
      const params: Partial<HeroParam> = {
        apikey: process.env['NX_MARVEL_PUBLIC_KEY'] || '',
        limit: DEFAULT_LIMIT,
        offset: page * limit,
      };
      if (searchTerm) {
        params.nameStartsWith = searchTerm;
      }

      // return of(heroMockResponse).pipe(
      //   delay(500),
      //   map((res: MarvelResponse) => res.data.results),
      // );
      return this.http.get<MarvelResponse>(HERO_API, { params }).pipe(map((res: MarvelResponse) => res.data.results));
    }),
  );

  changeSearch(searchTerm: string) {
    this.searchBS.next(searchTerm);
  }
}
