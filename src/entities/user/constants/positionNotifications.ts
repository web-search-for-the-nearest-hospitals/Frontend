import { toast } from 'react-toastify';

const errorPositionMessage = 'Неудалось получить данные о вашем местоположении.';
const infoPositionMessage = 'Пожалуйста разрешите браузеру доступ к геолокации.';
const successPositionMessage = 'Отображены результаты для вашей геолокации.';

export const errorPositionToast = () => {
  toast.error(errorPositionMessage, {
    toastId: errorPositionMessage,
  });
};

export const infoPositionToast = () => {
  toast.info(infoPositionMessage, {
    toastId: infoPositionMessage,
  });
};

export const successPositionToast = () => {
  toast.success(successPositionMessage, {
    toastId: successPositionMessage,
  });
};
