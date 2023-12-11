import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IgetCatRes {
  fact: string;
  length: number;
}

export const catApi = createApi({
  reducerPath: 'catApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://catfact.ninja/' }),
  endpoints: (builder) => ({
    getRandomFactAboutCat: builder.query<IgetCatRes, null>({
      query: () => 'fact',
    }),
  }),
});

export const { useLazyGetRandomFactAboutCatQuery, useGetRandomFactAboutCatQuery } = catApi;
