import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, markMessageAsShown } from "../features/userSlice";
import { toast } from "react-toastify";

function useToastMessage(sliceName: string) {
  const toastShownRef = useRef(false);

  const dispatch = useDispatch();
  const { message, messageType, isMessageShown } = useSelector((state) => state.user);

  useEffect(() => {
    const toastOptions = {
      toastId: `${sliceName}-${new Date(Date.now())}`,
      onClose: () => {
        dispatch(clearMessage());
      },
    };

    if (message && !isMessageShown && !toastShownRef.current) {
      toastShownRef.current = true;

      switch (messageType) {
        case "success":
          toast.success(message, toastOptions);
          dispatch(markMessageAsShown());
          break;
        case "error":
          toast.error(message, toastOptions);
          dispatch(markMessageAsShown());
          break;
        case "info":
          toast.info(message, toastOptions);
          dispatch(markMessageAsShown());
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
