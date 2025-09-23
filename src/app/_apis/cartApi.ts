import axios from "axios";
import { getTokenValue } from "../_utilites/getTokenValue";

const baseUrl = "https://ecommerce.routemisr.com/api/v1";

export const getCartItems = async () => {
  const token = await getTokenValue();

  return axios.post(
    `${baseUrl}/cart`,
    {}, 
    {
      headers: {
        token: token,
      },
    }
  ).then((res) => res.data);
};
