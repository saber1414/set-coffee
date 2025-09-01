import axios from "axios";
import toast from "react-hot-toast";

export const getFetchTickets = async () => {
  try {
    const res = await axios.get("/api/tickets", { withCredentials: true });
    return res.data?.tickets;
  } catch (err) {
    console.log("Error", err);
    toast.error("خطا در دریافت تیکتها");
  }
};

export const createTicketAnswer = async (answer: string) => {
  const res = await axios.post("/api/tickets/answer", answer, {
    withCredentials: true,
  });
  return res.data?.ticket;
};

export const removeTicket = async (id: string) => {
  const res = await axios.delete(`/api/tickets/${id}`, {
    withCredentials: true,
  });
  return res.data?.ticket;
};
