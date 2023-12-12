import './index.scss';
import { ICoord } from '~/shared/lib/types/interfaces';
import { useYandexMap } from '../module/useYandexMap';

export default function GetMap({ latitude, longitude }: ICoord) {
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
}
