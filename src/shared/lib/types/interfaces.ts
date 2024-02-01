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

export interface IBusinessHours {
  day: number;
  from_hour: string;
  to_hour: string;
}

interface IOrganization {
  short_name: string;
  factual_address: string;
  site: string;
  about: string | null;
  phone: string;
  is_full_time: boolean;
  business_hours: IBusinessHours[];
}

export interface IOrganizationFromList extends ICoordinates, IOrganization {
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

export interface IOrganizationById extends IOrganization {
  rating: 0 | 1 | 2 | 3 | 4 | 5 | null;
  specialties: ISpecialty[];
}

export interface IClinicListData {
  count: number;
  next: string;
  previous: string;
  results: IOrganizationFromList[];
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
  is_gov?: boolean;
  is_full_time?: boolean;
  search?: string; // сокращенное наим. организации
  page?: number; // пагинация?
}

export interface ICoupon {
  id: number;
  datetime_start: string;
}

export interface IGetCoupon {
  id: string;
  spec_code: string;
  which_date: string;
}
