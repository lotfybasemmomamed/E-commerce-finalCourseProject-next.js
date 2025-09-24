import axios from "axios";

const baseUrl = "https://ecommerce.routemisr.com/api/v1";


export const getWhishlistItems = async (token:string) => {

  return axios.get(
    `${baseUrl}/wishlist`,
    {
      headers: {
        token: token as string,
      },
    }
  ).then(res=>res.data)
};
export const addToWhishList=(productId:string ,token:string)=>axios.post(`${baseUrl}/wishlist`,{productId:productId}, {
      headers: {
        token: token as string,
      },
    }).then((res) => res.data);
export const deletWhishListItem=(productId:string ,token:string)=>axios.delete(`${baseUrl}/wishlist/${productId}`, {
      headers: {
        token: token as string,
      },
    }).then((res) => res.data);