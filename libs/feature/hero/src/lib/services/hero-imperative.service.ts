import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HeroParam } from '../models/hero.model';
import { MarvelResponse } from '../models/marvel.model';
import { HERO_API } from '../utils/const';
import { HeroParamRaw } from './../models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroImperativeService {
  constructor(private http: HttpClient) {}

  getHeroes({ limit, page, searchTerm }: HeroParamRaw) {
    const params: Partial<HeroParam> = {
      apikey: process.env['NX_MARVEL_PUBLIC_KEY'] || '',
      limit,
      offset: page * limit,
    };
    if (searchTerm) {
      params.nameStartsWith = searchTerm;
    }

    return this.http.get<MarvelResponse>(HERO_API, { params });
  }
}
