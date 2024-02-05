import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IAppointmentUserData,
  IClinicListData,
  ICoupon,
  IGetCoupon,
  IGetOrganizations,
  IOrganizationById,
  IResponseAppointmentUser,
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
    getOrganizationById: builder.query<IOrganizationById, string>({
      query: (id) => `organizations/${id}`,
    }),
    appointmentUser: builder.query<IResponseAppointmentUser, IAppointmentUserData>({
      query: (data) => ({
        url: 'appointments/' + data.id,
        method: 'PUT',
        headers: {
          Authorizations: 'kill me',
        },
        body: {
          fio: data.fio,
          phot: data.phone,
        },
      }),
    }),
  }),
});

export const {
  useGetSpecialtiesQuery,
  useGetTownsQuery,
  useGetOrganizationByIdQuery,
  useLazyGetOrganizationsQuery,
  useLazyGetTownsDataByIdQuery,
  useLazyGetCouponsOnDayQuery,
  useLazyGetOrganizationByIdQuery,
  useLazyAppointmentUserQuery,
} = rtkqueryApi;
