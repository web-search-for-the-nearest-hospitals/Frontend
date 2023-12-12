type TCoordPar = null | number;

export interface ICoord {
  latitude: TCoordPar;
  longitude: TCoordPar;
  accuracy?: TCoordPar;
  altitude?: TCoordPar;
  altitudeAccuracy?: TCoordPar;
  heading?: TCoordPar;
  spees?: TCoordPar;
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
