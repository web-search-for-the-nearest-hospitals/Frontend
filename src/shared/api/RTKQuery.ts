import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IgetCatRes {
  fact: string;
  length: number;
}

export const catApi = createApi({
  reducerPath: 'catApi', // как обращаться к этому slice
  baseQuery: fetchBaseQuery({ baseUrl: 'https://catfact.ninja/' }), //обёртка по добавлению url
  endpoints: (builder) => ({
    // название функции: builder.(query | mutation)<тип выходных данных, тип входных данных>
    getRandomFactAboutCat: builder.query<IgetCatRes, null>({
      query: () => 'fact', // какой url добавить к baseUrl
    }),
  }),
});

// use + getRandomFactAboutCat + Query, т.к. builder.query
// useLazy + getRandomFactAboutCat + Query, т.к. builder query и мы хотим контролировать запрос
// use + getRandomFactAboutCat + Mutation, если. builder.mutation
export const { useLazyGetRandomFactAboutCatQuery, useGetRandomFactAboutCatQuery } = catApi;
