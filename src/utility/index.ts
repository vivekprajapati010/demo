import { toast, ToastOptions } from "react-toastify";
import { ShowToasterOptions } from "../types/common";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const mobileRegex = /^[0-9]{10}$/;
export const emailRegex = /\S+@\S+\.\S+/;
export const showToaster = ({
  message,
  type = "default",
  position = "top-right",
  timeSpan = 5000,
}: ShowToasterOptions): void => {
  const options: ToastOptions = {
    position,
    autoClose: timeSpan,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    className: `toaster_${type}`,
  };

  switch (type) {
    case "error":
      toast.error(message, options);
      break;
    case "success":
      toast.success(message, options);
      break;
    case "information":
      toast.info(message, options);
      break;
    default:
      toast(message, options);
  }
};

