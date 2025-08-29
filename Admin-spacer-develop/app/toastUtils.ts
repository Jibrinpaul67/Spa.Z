import { toast, ToastOptions } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const showErrorToastAndNavigate = (
  router: ReturnType<typeof useRouter>,
  message: string,
  url: string,
  toastOptions: ToastOptions = {}
) => {
  const toastId = toast.error(message, {
    autoClose: 1000,
    ...toastOptions,
    onClose: () => {
      router.push(url);
    },
  });
  return toastId;
};

export const showSuccessToastAndNavigate = (
  router: ReturnType<typeof useRouter>,
  message: string,
  url: string,
  toastOptions: ToastOptions = {}
) => {
  const toastId = toast.success(message, {
    autoClose: 1000,
    ...toastOptions,
    onClose: () => {
      router.push(url);
    },
  });
  return toastId;
};
