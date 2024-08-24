import toast from "react-hot-toast";

class FormHelper {
  ErrorToast(msg: string) {
    toast.error(msg);
  }

  SuccessToast(msg: string) {
    toast.success(msg);
  }
}

// Create an instance of FormHelper
const formHelper = new FormHelper();

// Export the methods
export const ErrorToast = formHelper.ErrorToast.bind(formHelper);
export const SuccessToast = formHelper.SuccessToast.bind(formHelper);
