import { toast } from 'react-toastify';
import { errorPositionMessage, infoPositionMessage, successPositionMessage } from './constants';

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
