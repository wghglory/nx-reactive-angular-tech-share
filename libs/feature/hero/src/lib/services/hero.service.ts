import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

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
  limits = LIMITS;

  constructor(private http: HttpClient) {}

  getHeroes(searchTerm = DEFAULT_SEARCH) {
    const params: Partial<HeroParam> = {
      apikey: process.env['NX_MARVEL_PUBLIC_KEY'] || '',
      limit: DEFAULT_LIMIT,
      offset: +`${DEFAULT_LIMIT * DEFAULT_PAGE}`, // page * limit
    };
    if (searchTerm) {
      params.nameStartsWith = searchTerm;
    }

    return of(heroMockResponse).pipe(
      delay(500),
      map((res: MarvelResponse) => res.data.results),
    );
    // return this.http.get<MarvelResponse>(HERO_API, { params }).pipe(map((res: MarvelResponse) => res.data.results));
  }
}
