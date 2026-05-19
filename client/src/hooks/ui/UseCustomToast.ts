import { toast } from "sonner";

export const useCustomToast = () => {
  const showSuccess = (message: string, description?: string) => {
    toast.success(message, {
      description,
      duration: 3000,
    });
  };

  const showError = (message: string, description?: string) => {
    toast.error(message, {
      description,
      duration: 4000,
    });
  };

  const showInfo = (message: string, description?: string) => {
    toast.info(message, {
      description,
      duration: 3000,
    });
  };

  const showWarning = (message: string, description?: string) => {
    toast.warning(message, {
      description,
      duration: 3500,
    });
  };

  const showLoading = (message: string, description?: string) => {
    return toast.loading(message, {
      description,
    });
  };

  const dismiss = (toastId?: string | number) => {
    toast.dismiss(toastId);
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showLoading,
    dismiss,
  };
};
