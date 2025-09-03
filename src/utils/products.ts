import axios from "axios";

export const getFetchProducts = async () => {
  const res = await axios.get("/api/product");
  return res.data?.products;
};
