import { ICoord } from '~/shared/lib/types/interfaces';
import { errorPositionToast, infoPositionToast, successPositionToast } from './positionNotifications';

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
      successPositionToast();
    },
    () => {
      errorPositionToast();
      infoPositionToast();
    },
  );
}
