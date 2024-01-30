import './index.scss';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { specialtySelect } from '~/entities/clinic';
import { useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import { UserIcon } from '~/shared/assets/index';
import { IGetOrganizations } from '~/shared/lib/types/interfaces';
import { Button, Checkbox, DropDownInput, IconBtn } from '~/shared/ui/index';

interface ISearcher {
  onSearch: (data: IGetOrganizations) => void;
}

export default function Searcher({ onSearch }: ISearcher) {
  const { specialtyId } = useParams();
  const specialties = useAppSelector(specialtySelect);
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [isWorkAllDay, setIsWorkAllDay] = useState(false);
  const [isGovernment, setIsGovernment] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);
  const [isUserIconClicked, setIsUserIconClicked] = useState(false);
  const nav = useNavigate();

  const getCodeOfSpecialty = useCallback(
    (name: string) => specialties.find((el) => el.skill === name)!.code,
    [specialties],
  );

  const updateUrl = useCallback(() => nav(`/clinic-searcher/main/${specialty}`), [nav, specialty]);
  const handleSumbit = useCallback(() => {
    onSearch({
      specialty: specialty ? getCodeOfSpecialty(specialty) : '',
      is_gov: isGovernment,
      is_full_time: isWorkAllDay,
    });
    setFirstLoading(true);
  }, [getCodeOfSpecialty, isGovernment, isWorkAllDay, onSearch, specialty]);
  // дублируется в форме, но выносить дубликат дороже выйдет. В сомнениях.
  useEffect(() => {
    if (specialtyId && specialtyId !== 'null') {
      const val = specialties.find((el) => el.skill.toLowerCase() === specialtyId.toLowerCase())?.skill;
      setSpecialty(val || null);
    }
  }, [specialties, specialtyId]);

  useEffect(() => {
    if (firstLoading) {
      handleSumbit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstLoading, isGovernment, isWorkAllDay]);

  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  return (
    <div className="search-clinic">
      <div className="search-clinic__container">
        <DropDownInput
          values={specialties.map((obj) => obj.skill)}
          placeholder="Врач, специальность"
          state={specialty}
          setState={setSpecialty}
          isContentEditable
        />
        <Button type="submit" size="s" title="Найти" onClick={handleSumbit} />
        {/* На странице присутствуют две кнопки IconBtn(UserIcon)и два открывающихся элемента user-click (ниже),
          при внесении изменений здесь - изменить /widgets/header/ui/index.tsx */}
        <div className="search-clinic__icon-button">
          <IconBtn
            onClick={function (): void {
              isUserIconClicked ? setIsUserIconClicked(false) : setIsUserIconClicked(true);
            }}
          >
            <UserIcon width={33} height={35} />
          </IconBtn>
        </div>
      </div>
      <div className="search-clinic__group">
        <Checkbox state={isWorkAllDay} setState={setIsWorkAllDay} title="Круглосуточные" />
        <Checkbox state={isGovernment} setState={setIsGovernment} title="Государственные" />
      </div>
      {isUserIconClicked ? (
        <div className="search-clinic__user-click">
          <NavLink className="search-clinic__user-click-link" to="/clinic-searcher/main">
            Войти
          </NavLink>
          <NavLink className="search-clinic__user-click-link" to="/clinic-searcher/main">
            Регистрация
          </NavLink>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
