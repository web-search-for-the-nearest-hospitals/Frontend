import { ICoord } from '~/shared/lib/types/interfaces';

export default function watchUserPosition(setCoords: (data: ICoord) => void) {
  navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude, accuracy, altitudeAccuracy, heading, speed, altitude } = pos.coords;
      const serializedCoords = {
        latitude,
        longitude,
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        speed,
      };
      setCoords(serializedCoords);
    },
    () => {
      try {
        alert(
          'Неудалось получить данные о вашем местоположении. Пожалуйста разрешите в браузере доступ к вашей геолокации и перезагрузите страницу.',
        );
        throw new Error('Не удалось получить координаты');
      } catch (error) {
        console.log(error);
      }
    },
  );
}
