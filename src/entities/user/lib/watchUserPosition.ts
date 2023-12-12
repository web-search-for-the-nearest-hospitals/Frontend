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
    () => console.error('Не могу получить координаты'),
  );
}
