import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice'; // обязательно импорт по умолчанию
import { catApi } from '~/shared/api/RTKQuery';
import { setupListeners } from '@reduxjs/toolkit/query';
import userSlice from './slices/userSlice';

export const store = configureStore({
  // объединяем все reducers в один-корневой
  reducer: {
    [catApi.reducerPath]: catApi.reducer, // подключаем slice с api
    counter: counterSlice, // это редьюсер, а не сам slice
    user: userSlice,

    // Примеры
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
  // подключаем мидлвары с фичами от RTKQ, в т.ч. кеширование к catApi
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(catApi.middleware),
});

// подключаем refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
// RootState - выведенный тип redux-хранилища
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// Выводим тип функции dispatch
export type AppDispatch = typeof store.dispatch;
