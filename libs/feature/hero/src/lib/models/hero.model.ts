export interface Hero {
  id: number;
  name: string;
  description: string;
  thumbnail: HeroThumbnail;
  resourceURI: string;
  modified: string;
  comics: HeroSubItems;
  events: HeroSubItems;
  series: HeroSubItems;
  stories: HeroSubItems;
  urls: { type: string; url: string }[];
}

export interface HeroThumbnail {
  path: string;
  extension: string;
}

export interface HeroSubItems {
  available: number;
  returned: number;
  collectionURI: string;
  items: HeroSubItem[];
}

export interface HeroSubItem {
  resourceURI: string;
  name: string;
  type?: string;
}

export interface HeroParam {
  apikey: string;
  limit: number;
  offset: number;
  nameStartsWith: string;
}

export interface HeroParamRaw {
  limit: number;
  page: number;
  searchTerm: string;
}
