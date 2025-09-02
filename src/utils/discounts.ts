import axios from "axios"

export const getFetchDiscounts = async() => {
    const res = await axios.get("/api/discount", { withCredentials: true });
    return res.data.discounts
};