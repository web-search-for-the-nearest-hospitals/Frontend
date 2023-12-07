export interface Coord {
  lat: number;
  long: number;
}

export interface Organization {
  full_name: string;
  short_name: string;
  inn: number;
  factual_address: string;
  region_code: number;
  coord: Coord;
  site: string;
  email: string;
}

export interface Specialty {
  code: string;
  name: string;
  skill: string;
}

export interface Specialties extends Array<Specialty> {}
