import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice'; // обязательно импорт по умолчанию

export const store = configureStore({
  // объединяем все reducers в один-корневой
  reducer: {
    counter: counterSlice, // это редьюсер, а не сам slice

    // Примеры
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// RootState - выведенный тип redux-хранилища
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// Выводим тип функции dispatch
export type AppDispatch = typeof store.dispatch;
