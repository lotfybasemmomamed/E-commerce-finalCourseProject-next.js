import axios from "axios"
const baseUrl='https://ecommerce.routemisr.com/api/v1'
export const getAllProducts=()=>axios.get(`${baseUrl}/products`).then(res=>res.data)
export const getSingleProduct=({ id }: { id: string })=>axios.get(`${baseUrl}/products/${id}`).then(res=>res.data.data)
