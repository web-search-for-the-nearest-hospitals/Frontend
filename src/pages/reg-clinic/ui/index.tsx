import './index.scss';
import ProgressScale from '~/shared/ui/ProgressScale/ProgressScale';

function RegistrationPage() {
  return (
    <>
      <section className="registration-page">
        <div className="registration-page__container">
          <h1 className="registration-page__title">Регистрация клиники</h1>
          <ProgressScale active={2} />
        </div>
      </section>
    </>
  );
}

export default RegistrationPage;
