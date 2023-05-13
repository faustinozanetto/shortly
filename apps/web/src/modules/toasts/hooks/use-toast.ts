import { useToastContext } from '@modules/toasts/hooks/use-toast-context';
import { Toast, ToastActionType } from '@modules/toasts/types/toasts.types';

/**
 * Hook that returns a function to create toasts.
 * @returns The function to create toast.
 */
export const useToast = () => {
  const { dispatch } = useToastContext();

  const toast = (toast: Omit<Toast, 'id'>, duration: number = 3000) => {
    const toastId = Math.random().toString(12).substring(2, 10);
    dispatch({
      type: ToastActionType.ADD_TOAST,
      payload: {
        toast: { ...toast, id: toastId },
      },
    });

    setTimeout(() => {
      dispatch({
        type: ToastActionType.REMOVE_TOAST,
        payload: {
          toast: toastId,
        },
      });
    }, duration);
  };

  return { toast };
};
