import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetOrganizations, IOrganization, ISpecialty, ITown } from '../lib/types/interfaces';

export const rtkqueryApi = createApi({
  reducerPath: 'rtkqueryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getSpecialties: builder.query<ISpecialty[], null>({
      query: () => 'specialties/',
    }),
    getTowns: builder.query<ITown[], null>({
      query: () => 'towns/',
    }),
    getOrganizations: builder.query<IOrganization[], IGetOrganizations>({
      query: () => 'organizations/',
    }),
  }),
});

export const { useGetSpecialtiesQuery, useGetTownsQuery, useLazyGetOrganizationsQuery } = rtkqueryApi;
