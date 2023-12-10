import { useYandexMap } from '~/shared/helpers/customHooks/useYandexMap';
import { useAppSelector } from '~/shared/helpers/customHooks/reduxHooks';
import { userSelect } from '~/shared/store/slices/userSlice';
import './MapPage.scss';

function MapPage() {
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = useYandexMap();
  const { latitude, longitude } = useAppSelector(userSelect).coord;

  return (
    <section className="map-page">
      {latitude && longitude ? (
        <>
          {YMap && (
            <div>
              <h2 className="map-page__title">Яндекс Карта</h2>
              <YMap location={{ center: [longitude, latitude], zoom: 14 }} mode="vector">
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />

                <YMapMarker
                  coordinates={[Math.random() / 100 + longitude, Math.random() / 100 + latitude]}
                  draggable={true}
                >
                  <div className="map-page__mark" />
                  <span className="map-page__mark-text">Цель</span>
                </YMapMarker>

                <YMapMarker coordinates={[longitude, latitude]} draggable={true}>
                  <div className="map-page__mark" />
                  <span className="map-page__mark-text">Вы</span>
                </YMapMarker>
              </YMap>
            </div>
          )}

          <div>
            <h2 className="map-page__title">openstreetmap</h2>
            <iframe
              className="map-page__iframe"
              title="openstreetmap map"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}&amp;layer=mapnik`}
            />
          </div>
        </>
      ) : (
        <h2>Нет координат</h2>
      )}
    </section>
  );
}

export default MapPage;
