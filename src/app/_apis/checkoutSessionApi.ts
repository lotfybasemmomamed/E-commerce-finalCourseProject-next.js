import axios from "axios";
import { CheckoutFormValues } from "../_schemas/checkoutFormSchema";

const baseUrl = "https://ecommerce.routemisr.com/api/v1";


export const checkoutSessionApi = async (cartId:string,token:string,data:CheckoutFormValues) => {

  return axios.post(
    `${baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:3000`,data,
    {
      headers: {
        token: token as string,
      },
    }
  ).then(res=>res.data)
};
