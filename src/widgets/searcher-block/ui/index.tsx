import './index.scss';
import { useEffect, useState } from 'react';

import { useGetSpecialtiesQuery } from '~/shared/api/rtkqueryApi';
import { UserIcon } from '~/shared/assets/index';
import createToast from '~/shared/lib/toast/createToast';
import { IGetOrganizations } from '~/shared/lib/types/interfaces';
import { Button, Checkbox, DropDownInput, IconBtn } from '~/shared/ui/index';

interface ISearcher {
  onClick: (data: IGetOrganizations) => void;
}

export default function Searcher({ onClick }: ISearcher) {
  const [specialty, setSpeciality] = useState<string | null>(null);
  const [isWorkAllDay, setIsWorkAllDay] = useState(false);
  const [isGovernment, setIsGovernment] = useState(false);
  const { data, isLoading, isError } = useGetSpecialtiesQuery(null);

  const getCodeOfSpecialty = (name: string) => data!.find((el) => el.skill === name)!.code;

  useEffect(() => {
    if (isError) {
      createToast('error', 'Не удалось получить список специальностей');
    }
  }, [isError]);

  if (isLoading || !data) {
    return <p className="search-clinic">Загружаю список специальностей</p>;
  }

  return (
    <div className="search-clinic">
      <div className="search-clinic__container">
        <DropDownInput
          values={data.map((obj) => obj.skill)}
          placeholder="Врач, специальность"
          state={specialty}
          setState={setSpeciality}
          isContentEditable
        />
        <Button
          type="submit"
          size="s"
          title="Найти"
          onClick={() =>
            onClick({
              specialty: specialty ? getCodeOfSpecialty(specialty) : '',
              is_gov: isGovernment,
              is_full_time: isWorkAllDay,
            })
          }
        />
        <div className="search-clinic__icon-button">
          {/* На странице присутствуют две кнопки IconBtn(UserIcon),
           при внесении изменений в эту кнопку - изменить вторую /widgets/header/ui/index.tsx */}
          <IconBtn
            onClick={function (): void {
              createToast('info', 'I work!');
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
    </div>
  );
}
