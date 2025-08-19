import { Toaster } from "react-hot-toast";
import { position, toastOptions } from "@/utils/toasterConfig";

export default function ToastProvider() {
  return <Toaster position={position} toastOptions={toastOptions} />;
}
