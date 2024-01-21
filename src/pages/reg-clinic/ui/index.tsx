import './index.scss';
import ProgressScale from '~/shared/ui/ProgressScale/ProgressScale';
// import Button from '~/shared/ui/Button/Button';

function RegistrationPage() {
  return (
    <>
      <main>
        <section className="registration-page">
          <div className="registration-page__container">
            <h1 className="registration-page__title">Регистрация клиники</h1>
            <ProgressScale active={'3'} />
            {/* <Button title={'Далее'} type="submit" size="s" /> */}
          </div>
        </section>
      </main>
    </>
  );
}

export default RegistrationPage;
