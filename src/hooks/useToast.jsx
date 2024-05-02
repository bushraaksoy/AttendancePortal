import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = (message, type) => {
  return (
    <>
      {toast(message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type: type,
      })}
    </>
  );
};

export default useToast;
