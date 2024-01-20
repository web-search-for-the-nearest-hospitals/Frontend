import './FormClinic.scss';
import { Button } from '~/shared/ui/index';

function FormClinic() {
  return (
    <>
      <main>
        <form className="form-clinic">
          <div className="form-clinic__container">
            <h1 className="form-clinic__title">Регистрация клиники</h1>
            <section className="form-clinic__progress-scale">
              <div className="form-clinic__progress-element ">
                <div className="form-clinic__progress-element-circle form-clinic__progress-element-circle_active">
                  1
                </div>
                <div className="form-clinic__progress-element-line form-clinic__progress-element-line_active"></div>
                <p className="form-clinic__progress-element-text form-clinic__progress-element-text_active">
                  Информация о клинике
                </p>
              </div>
              <div className="form-clinic__progress-element">
                <div className="form-clinic__progress-element-circle ">2</div>
                <div className="form-clinic__progress-element-line"></div>
                <p className="form-clinic__progress-element-text ">Информация о специалистах</p>
              </div>
              <div className="form-clinic__progress-element">
                <div className="form-clinic__progress-element-circle ">3</div>
                <p className="form-clinic__progress-element-text ">Авторизация</p>
              </div>
            </section>
            <Button title={'Далее'} type={'submit'} size={'m'} disabled={true} />
          </div>
        </form>
      </main>
    </>
  );
}

export default FormClinic;
