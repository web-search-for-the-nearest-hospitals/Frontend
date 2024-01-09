import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IClinicListData, IGetOrganizations, ISpecialty, ITown } from '../lib/types/interfaces';

export const rtkqueryApi = createApi({
  reducerPath: 'rtkqueryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://45.86.181.61/api/',
  }),
  endpoints: (builder) => ({
    getSpecialties: builder.query<ISpecialty[], null>({
      query: () => 'specialties/',
    }),
    getTowns: builder.query<ITown[], null>({
      query: () => 'towns/',
    }),
    getOrganizations: builder.query<IClinicListData, IGetOrganizations>({
      query: () => 'organizations/',
    }),
  }),
});

export const { useGetSpecialtiesQuery, useGetTownsQuery, useLazyGetOrganizationsQuery } = rtkqueryApi;
