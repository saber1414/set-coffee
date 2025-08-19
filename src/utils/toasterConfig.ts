import type { ToastOptions } from "react-hot-toast";

export const position = "top-left";

export const toastOptions: ToastOptions = {
  duration: 4000,
  style: {
    direction: "rtl",
    textAlign: "right",
    fontSize: "0.95rem",
    background: "#fff",
    color: "#333",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
};
