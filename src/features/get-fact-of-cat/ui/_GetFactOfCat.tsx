import { useEffect } from 'react';
import { useGetRandomFactAboutCatQuery, useLazyGetRandomFactAboutCatQuery } from '../api/RTKQuery';

export default function _GetFactOfCat() {
  // Несмотря на то, что это "2 разные реализации, они ссылаются на один объект-функцию и получают одни и те же данные"
  const { error, isLoading, data } = useGetRandomFactAboutCatQuery(null);
  const [triggerQuery, queryResult, lastPromiseInfo] = useLazyGetRandomFactAboutCatQuery();

  useEffect(() => {
    triggerQuery(null);
    console.log(queryResult, lastPromiseInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerQuery]);

  // @TODO: типовой заголовок и типовой текст можно вынести в ui
  return (
    <>
      <h3>Случайный факт о котиках</h3>
      <p style={{ maxWidth: '600px', margin: 'auto' }}>
        {error ? 'произошла ошибка' : isLoading ? 'загружаем' : data?.fact}
      </p>
      <h3>Случайный факт о котиках из lazy функции</h3>
      <p style={{ maxWidth: '600px', margin: 'auto' }}>
        {queryResult.error ? 'произошла ошибка' : queryResult.isLoading ? 'загружаем' : queryResult.data?.fact}
      </p>
    </>
  );
}
