import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IClinicListData,
  ICoupon,
  IGetCoupon,
  IGetOrganizations,
  ISpecialty,
  ITown,
  ITowns,
} from '../lib/types/interfaces';
import { addQueryParams } from '../lib/addQueryParams';

export const rtkqueryApi = createApi({
  reducerPath: 'rtkqueryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACK_URL + 'api/',
  }),
  endpoints: (builder) => ({
    getSpecialties: builder.query<ISpecialty[], null>({
      query: () => 'specialties/',
    }),
    getTowns: builder.query<ITowns[], null>({
      query: () => 'towns/',
    }),
    getTownsDataById: builder.query<ITown, string>({
      query: (i) => `towns/${i}`,
    }),
    getCouponsOnDay: builder.query<ICoupon[], IGetCoupon>({
      query: ({ id, ...filters }) => `organizations/${id}/free-tickets/?` + addQueryParams(filters),
    }),
    getOrganizations: builder.query<IClinicListData, IGetOrganizations>({
      query: (filters: Record<string, string>) => 'organizations/?' + addQueryParams(filters),
    }),
  }),
});

export const {
  useGetSpecialtiesQuery,
  useGetTownsQuery,
  useLazyGetOrganizationsQuery,
  useLazyGetTownsDataByIdQuery,
  useLazyGetCouponsOnDayQuery,
} = rtkqueryApi;
