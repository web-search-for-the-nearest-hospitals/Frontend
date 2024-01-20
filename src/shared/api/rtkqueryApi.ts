import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IClinicListData, IGetOrganizations, ISpecialty, ITown, ITowns } from '../lib/types/interfaces';
console.log((import.meta.env.VITE_BACK_URL || process.env['VITE_BACK_URL']) + 'api/');
export const rtkqueryApi = createApi({
  reducerPath: 'rtkqueryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: (import.meta.env.VITE_BACK_URL || process.env['VITE_BACK_URL']) + 'api/',
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
    getOrganizations: builder.query<IClinicListData, IGetOrganizations>({
      query: (filters: Record<string, string>) =>
        'organizations/?' +
        Object.keys(filters)
          .filter((key) => filters[key])
          .map((key) => `${key}=${filters[key]}`)
          .join('&'),
    }),
  }),
});

export const { useGetSpecialtiesQuery, useGetTownsQuery, useLazyGetOrganizationsQuery, useLazyGetTownsDataByIdQuery } =
  rtkqueryApi;
