export interface ICoord {
  lat: number;
  long: number;
}

export interface IOrganization {
  full_name: string;
  short_name: string;
  inn: number;
  factual_address: string;
  region_code: number;
  coord: ICoord;
  site: string;
  email: string;
}

export interface ISpecialty {
  code: string;
  name: string;
  skill: string;
}

export interface ISpecialties extends Array<ISpecialty> {}
