import axios from "axios"

const baseUrl ='https://ecommerce.routemisr.com/api/v1'
export const getAllProducts=()=>axios.get(`${baseUrl}/products`).then(res=>res.data)