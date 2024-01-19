import './AdvertCard.scss';

export default function AdvertCard({ advert }: any) {
  return (
    <div className="advert-card">
      <img className="advert-card__image" src={advert.img} alt={advert.name} />
    </div>
  );
}
