import './FormClinic.scss';
import { Button } from '~/shared/ui/index';

function FormClinic() {
  return (
    <>
      <form className="form-clinic">
        <div className="form-clinic__container">
          <h1 className="form-clinic__title">Регистрация клиники</h1>
          <section className="form-clinic__progress-scale">
            <article className="form-clinic__progress-element ">
              <div className="form-clinic__progress-element-circle active-circle-and-line">1</div>
              <div className="form-clinic__progress-element-line active-circle-and-line"></div>
              <p className="form-clinic__progress-element-text active-text">Информация о клинике</p>
            </article>
            <article className="form-clinic__progress-element">
              <div className="form-clinic__progress-element-circle ">2</div>
              <div className="form-clinic__progress-element-line"></div>
              <p className="form-clinic__progress-element-text ">Информация о специалистах</p>
            </article>
            <article className="form-clinic__progress-element">
              <div className="form-clinic__progress-element-circle ">3</div>
              <p className="form-clinic__progress-element-text ">Авторизация</p>
            </article>
          </section>
          <Button title={'Далее'} type={'submit'} size={'m'} disabled={true} />
        </div>
      </form>
    </>
  );
}

export default FormClinic;
