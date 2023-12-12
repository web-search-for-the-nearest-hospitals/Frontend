import { store } from './store';

type AppDispatch = typeof store.dispatch;

declare global {
  type RootState = ReturnType<typeof store.getState>;
  type TUseAppDispatch = () => AppDispatch;
  type TUseAppSelector = TypedUseSelectorHook<RootState>;
}
