const { BASE_URL } = process.env;
import { Coord, Organization } from '../helpers/interfaces';

async function checkRequest(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject({
    status: `Ошибка: ${res.status}`,
    message: `${(await res.json()).message}`,
  });
}

// список организаций по имеющимся коррдинатам (latitude, longitude), функция принимает объект coord из двух координат {lat, long}
export const getOrganizations = (coord: Coord) => {
  return fetch(`${BASE_URL}/organizations/?lat=${coord.lat}&long=${coord.long}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => checkRequest(res));
};

// информация об организации по id
export const getOrganizationInfo = (org_id: string) => {
  return fetch(`${BASE_URL}/organizations/${org_id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => checkRequest(res));
};

// регистрация новой организации, функция принимает объект параметров организации organization
export const registerOrganization = (organization: Organization) => {
  return fetch(`${BASE_URL}/organizations/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // credentials: 'include', __ указать порядок авторизации для админов и представителей организации
    body: JSON.stringify(organization),
  }).then((res) => checkRequest(res));
};

// редактирование профиля организации, функция принимает id и объект параметров организации organization
export const editOrganization = (org_id: string, organization: Organization) => {
  return fetch(`${BASE_URL}/organizations/${org_id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // credentials: 'include', __ указать порядок авторизации для админов и представителей организации
    body: JSON.stringify(organization),
  }).then((res) => checkRequest(res));
};

// удаление организации по id
export const deleteOrganization = (org_id: string) => {
  return fetch(`${BASE_URL}/organizations/${org_id}`, {
    method: 'DELETE',
    // credentials: 'include', __ указать порядок авторизации для админов и представителей организации
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

// список врачебных специальностей
export const getSpecialties = () => {
  return fetch(`${BASE_URL}/specialties/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => checkRequest(res));
};

// информация о врачебной специальности по коду
export const getSpecialtyInfo = (specialty_code: string) => {
  return fetch(`${BASE_URL}/specialties/${specialty_code}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => checkRequest(res));
};

// список городов
export const getTowns = () => {
  return fetch(`${BASE_URL}/towns/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => checkRequest(res));
};

// информация о городе по id
export const getTownInfo = (town_id: number) => {
  return fetch(`${BASE_URL}/towns/${town_id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => checkRequest(res));
};
