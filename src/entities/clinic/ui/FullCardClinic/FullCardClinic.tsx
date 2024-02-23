import './FullCardClinic.scss';
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Button } from '~/shared/ui/index';
import { IOrganizationById } from '~/shared/lib/types/interfaces';
import TimetableClinic from '../TimetableClinic/TimetableClinic';
import INFO from './temporaryConsts';
import star from '~/shared/assets/images/star.svg';
import plus from '~/shared/assets/images/plus.svg';

interface IFullCard {
  clinic: IOrganizationById;
}
interface IInfo {
  id: number;
  text: string;
  name: string;
  date: string;
  rating: number;
}

export function FullCardClinic({ clinic }: IFullCard) {
  const [searchParams] = useSearchParams();
  const { clinicId } = useParams();
  const getIsPhone = () => window.screen.width < 625;
  const comments: IInfo[] = INFO;
  const nav = useNavigate();

  return (
    <>
      <div className={'clinic-popup'}>
        <button className="clinic-popup__button-nav" onClick={() => nav(-1)}>
          <span className="clinic-popup__arrow-back"> &#8249;</span> Назад
        </button>
        <h3 className="clinic-popup__name">{clinic.short_name}</h3>
        <p className="clinic-popup__about">{clinic.about}</p>
        <div className="clinic-popup__timetable">
          <p className="clinic-popup__timetable-title">График работы:</p>
          {TimetableClinic(clinic, 'popup')}
        </div>
        <div className={clinic.specialties.length ? 'clinic-popup__address' : 'clinic-popup__address-right'}>
          <p className="clinic-popup__address-text">
            <span className="clinic-popup__address-title">Адрес:</span>
            {clinic.factual_address}
          </p>
        </div>
        <div className="clinic-popup__phone">
          <p className="clinic-popup__phone-title">Телефон: </p>
          <a
            href={`tel:${clinic.phone}`}
            className={`clinic-popup__phone-number ${getIsPhone() ? 'clinic-popup__phone-number_active' : ''}`}
            style={{ pointerEvents: getIsPhone() ? 'auto' : 'none' }}
          >
            {clinic.phone}
          </a>
        </div>
        <div className="clinic-popup__site">
          <p className="clinic-popup__site-title">Сайт: </p>
          <a className="clinic-popup__site-link" href={clinic.site} target="_blank" rel="noopener noreferrer">
            {clinic.site}
          </a>
        </div>
        {/* format relative_addr: /api/organizations/id/ - на конце слеш */}
        {!!clinic.specialties.length && (
          <NavLink
            to={`../appointment/${clinicId}?specialty=${searchParams.get('specialty')}`}
            className="clinic-popup__btn"
          >
            <Button title={'Записаться'} size="forForm" type="submit" disabled={!clinic.specialties.length} />
          </NavLink>
        )}
      </div>
      <div className={'clinic-popup__comments'}>
        <div className="clinic-popup__comments-counter">Отзывы (123)</div>
        <button className="clinic-popup__comments-btn">
          <img className="clinic-popup__comments-plus" src={plus} /> Добавить отзыв
        </button>
        {comments.map((comment) => (
          <div key={comment.id} className="clinic-popup__comments-container">
            <div className="clinic-popup__comments-header">
              <div className="clinic-popup__comments-name">{comment.name}</div>
              <span className="clinic-popup__comments-date">{comment.date}</span>
              <div className="clinic-popup__comments-rating">
                {Array(comment.rating)
                  .fill('', 0, comment.rating)
                  .map(() => (
                    <img src={star} alt="звезда" className="clinic-popup__comments-star" key={Math.random()} />
                  ))}
              </div>
            </div>
            <p className="clinic-popup__comments-text">{comment.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
