// можно заменить зависимость compose-function на самописное каррирование
// тогда @types/compose-function тоже можно убрать
import compose from 'compose-function';
import WithRouter from './WithRouter';
import WithStrictMode from './WithStrictMode';
import WithReduxStore from '~/app/providers/WithReduxStore';
import WithYMapProvider from './WithYMapProvider';

// функции принимают на вход FC, но возвращают JSX разметку, пришлось их переписать, чтобы возвращали они unnamed FC
export const withProviders = compose(WithStrictMode, WithReduxStore, WithRouter, WithYMapProvider);
