import { ICoord } from '~/shared/types/interfaces';
import { useYandexMap } from '../module/customHooks/useYandexMap';
import './get-map.scss';
// import { YMaps, Map, Placemark } from 'react-yandex-maps';

export const GetMap = ({ latitude, longitude }: ICoord): JSX.Element => {
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = useYandexMap();
  const mapState = { center: [longitude, latitude], zoom: 9 };

  return latitude && longitude && YMap ? (
    <section className="map">
      <YMap location={mapState} mode="vector">
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <YMapMarker coordinates={[longitude, latitude]} draggable={true}>
          <div className="map__mark" />
          <span className="map__mark-text">Вы</span>
        </YMapMarker>
      </YMap>
    </section>
  ) : (
    <div>Загружаю карту...</div>
  );
};

{
  /* <YMaps>
        <div>
          <Map defaultState={mapState} width="635px" height="395px">
            <Placemark geometry={[55.751574, 37.573856]} />
          </Map>
        </div>
      </YMaps> */
}
