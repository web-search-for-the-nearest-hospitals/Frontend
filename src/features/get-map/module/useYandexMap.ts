// @TODO убрать игноры

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export function useYandexMap() {
  const [ymapsModule, setYmapsModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadYmapsModule = async () => {
      try {
        // @ts-expect-error нужно изменить tsconfig под api яндекса
        const ymaps3Reactify = await ymaps3.import('@yandex/ymaps3-reactify');
        const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);
        // @ts-expect-error нужно изменить tsconfig под api яндекса
        setYmapsModule({ ...reactify.module(ymaps3) });
      } catch (error) {
        console.error('Ошибка при загрузке модуля Яндекс.Карт:', error);
      } finally {
        setLoading(false);
      }
    };

    loadYmapsModule();
  }, []);

  return { ...ymapsModule, loading };
}
