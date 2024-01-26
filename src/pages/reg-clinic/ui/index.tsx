import './index.scss';
import { useState } from 'react';
import { ProgressScale } from '~/shared/ui/index';

function RegistrationPage() {
  const [stage] = useState(1);
  return (
    <>
      <section className="registration-page">
        <div className="registration-page__container">
          <h1 className="registration-page__title">Регистрация клиники</h1>
          <ProgressScale activeStage={stage} />
        </div>
      </section>
    </>
  );
}

export default RegistrationPage;
