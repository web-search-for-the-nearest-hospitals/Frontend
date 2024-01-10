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

interface ICoordinates {
  latitude: number;
  longitude: number;
}

interface IBusinessHours {
  day: number;
  from_hour: string;
  to_hour: string;
}

export interface IOrganization extends ICoordinates {
  relative_addr: string;
  short_name: string;
  factual_address: string;
  site: string;
  about: string | null;
  phone: string;
  town: string;
  district: string;
  is_full_time: boolean;
  business_hours: IBusinessHours[];
}

export interface IClinicListData {
  count: number;
  next: string;
  previous: string;
  results: IOrganization[];
}

export interface ISpecialty {
  code: string;
  name: string;
  skill: string;
}

export interface ITowns {
  name: string;
  relative_addr: string;
}

export interface ITown extends ICoordinates {
  name: string;
  districts: IDistrict[];
}

export interface IDistrict extends ICoordinates {
  name: string;
}

export interface IGetOrganizations extends Partial<ICoordinates> {
  specialty?: string;
  town?: string;
  district?: string;
  is_gov?: string;
  is_full_time?: string;
  search?: string; // сокращенное наим. организации
  page?: number; // пагинация?
}
