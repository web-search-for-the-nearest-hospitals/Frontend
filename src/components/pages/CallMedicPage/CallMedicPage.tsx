import { useState } from 'react';
import './CallMedicPage.scss';

function CallMedicPage() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [pos, setPos] = useState<string | null>(null);
  navigator.geolocation.getCurrentPosition(
    (data) => {
      setLatitude(data.coords.latitude);
      setLongitude(data.coords.longitude);
    },
    () => console.error('Не могу получить координаты'),
  );

  // @TODO вынести в api
  fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=APIKEY&geocode=${longitude},${latitude}&format=json`)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error('Ошибка при попытке получить координаты места');
    })
    .then((data) => {
      setPos(data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text);
    })
    .catch((err) => console.error(err));

  // @TODO прописать разные кейсы: дтп, самочувствие, болезнь близкого, нападение
  return (
    <main className="call-medic">
      <section className="call-medic__content">
        <h2 className="call-medic__title">
          Ваше местоположение - {pos ? pos : `${latitude} - широта, ${longitude} - долгота `}
        </h2>
        <h3 className="call-medic__subtitle">Эту информацию следует в свободной форме изложить оператору</h3>
        <ul className="call-medic__hints-list">
          <li className="call-medic__hints-element">По возможности сообщите ФИО пострадавшего и его дату рождения</li>
          <li className="call-medic__hints-element">
            Сообщите о сути проблемы: симптомы, травмы, характер повреждений
          </li>
          <li className="call-medic__hints-element">
            Сообщите текущий адрес: {pos ? pos : `${latitude} - широта, ${longitude} - долгота `}
          </li>
          <li className="call-medic__hints-element">
            Ожидайте помощь. Окажите посильную помощь себе и другим пострадавшим.
          </li>
        </ul>
        <a href="tel:112" target="_blank" rel="noreferrer" className="call-medic__link">
          <button className="call-medic__button">Чтобы вызвать 112 нажмите сюда</button>
        </a>
      </section>
    </main>
  );
}

export default CallMedicPage;
