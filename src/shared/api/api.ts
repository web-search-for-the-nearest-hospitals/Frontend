const BACK_URL = import.meta.env.VITE_BACK_URL;
import { ICoord, IOrganizationFromList } from '../lib/types/interfaces';

async function checkRequest(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// универсальная функция запроса, на вход получает endpoint, опции и метод, на выходе объект.
// Желательно внести в Wiki с примерами, в последствие после тестирования названия можно убрать,
// обращение возможно производить api('/organizations/', coord); - список организаций по имеющимся координатам и др.

export async function api(endpoint: string, options?: object, method = 'GET') {
  let url = `${BACK_URL}${endpoint}`;
  if (method === 'GET') {
    if (options) {
      url +=
        '?' +
        Object.entries(options)
          .map(([key, val]) => `${key}=${val}`)
          .join('&');
    }
    return fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => checkRequest(res));
  }
  return fetch(url, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  }).then((res) => checkRequest(res));
}

// список организаций по имеющимся коррдинатам (latitude, longitude), функция принимает объект coord из двух координат {lat, long}
export const getOrganizations = (coord: ICoord) => {
  return api('/organizations/', coord);
};

// информация об организации по id
export const getOrganizationInfo = (org_id: string) => {
  return api(`/organizations/${org_id}`);
};

// регистрация новой организации, функция принимает объект параметров организации organization
export const registerOrganization = (organization: IOrganizationFromList) => {
  return api(`/organizations/`, organization, 'POST');
};

// редактирование профиля организации, функция принимает id и объект параметров организации organization
export const editOrganization = (org_id: string, organization: IOrganizationFromList) => {
  api(`/organizations/${org_id}`, organization, 'PATCH');
};

// удаление организации по id
export const deleteOrganization = (org_id: string) => {
  api(`/organizations/${org_id}`, {}, 'DELETE');
};

// список врачебных специальностей
export const getSpecialties = () => {
  api(`/specialties/`);
};

// информация о врачебной специальности по коду
export const getSpecialtyInfo = (specialty_code: string) => {
  api(`/specialties/${specialty_code}`);
};

// список городов
export const getTowns = () => {
  api(`/towns/`);
};

// информация о городе по id
export const getTownInfo = (town_id: number) => {
  api(`/towns/${town_id}`);
};
