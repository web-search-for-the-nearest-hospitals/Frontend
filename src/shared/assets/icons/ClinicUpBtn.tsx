import pic from './timetable-arrow-up.svg';

export default function ClinicUpBtn() {
  return (
    <img
      src={pic}
      alt="dropdown icon"
      style={{ display: 'block', alignSelf: 'flex-end', transform: 'rotate(180deg) translateY(50%)' }}
    />
  );
}
