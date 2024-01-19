import { errorPositionMessage, infoPositionMessage, successPositionMessage } from './constants';
import createToast from '~/shared/lib/toast/createToast';

export const errorPositionToast = () => createToast('error', errorPositionMessage);
export const infoPositionToast = () => createToast('info', infoPositionMessage);
export const successPositionToast = () => createToast('success', successPositionMessage);
