import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, userMarkMessageAsShown } from "../features/userSlice";
import { toast } from "react-toastify";
import { companyMarkMessageAsShown } from "../features/companySlice";

function useToastMessage(sliceName: string) {
  console.log("ToastSliceName", sliceName);

  const toastShownRef = useRef(false);

  const dispatch = useDispatch();
  const { message, messageType, isMessageShown } = useSelector((state) => state[sliceName]);

  // console.log("mesage,type,shown", message, messageType, isMessageShown);

  useEffect(() => {
    const toastOptions = {
      toastId: `${sliceName}-${new Date(Date.now())}`,
      onClose: () => {
        dispatch(clearMessage());
      },
    };

    let messageShown;

    if (sliceName === "user") {
      messageShown = userMarkMessageAsShown;
    }

    if (sliceName === "company") {
      messageShown = companyMarkMessageAsShown;
    }

    if (message && !isMessageShown && !toastShownRef.current) {
      toastShownRef.current = true;

      switch (messageType) {
        case "success":
          toast.success(message, toastOptions);
          dispatch(messageShown());
          break;
        case "error":
          toast.error(message, toastOptions);
          dispatch(messageShown());
          break;
        case "info":
          toast.info(message, toastOptions);
          dispatch(messageShown());
          break;
        default:
          toast(message);
      }
    }

    if (!message) {
      toastShownRef.current = false;
    }
  }, [dispatch, isMessageShown, message, messageType, sliceName]);

  return;
}

export default useToastMessage;
