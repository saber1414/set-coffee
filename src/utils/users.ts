import axios from "axios";

export const getFetchUsers = async () => {
  try {
    const res = await axios.get("/api/auth/users", { withCredentials: true });
    return res.data?.users;
  } catch (err) {
    console.error("Error receiving users", err);
    return null;
  }
};

export const getFetchUserDelete = async (id: string) => {
  try {
    const res = await axios.delete(`/api/auth/users/${id}`, {
      withCredentials: true,
    });
    return res.data?.user;
  } catch (err) {
    console.log("Error deleted todo", err);
    return null;
  }
};
