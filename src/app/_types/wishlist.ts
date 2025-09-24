export interface WishListRoot {
  status: string
  count: number
  data: WishListDaum[]
}

export interface WishListDaum {
  sold: number
  images: string[]
  subcategory: WishListSubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: WishListCategory
  brand: WishListBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

export interface WishListSubcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface WishListCategory {
  _id: string
  name: string
  slug: string
  image: string
}

export interface WishListBrand {
  _id: string
  name: string
  slug: string
  image: string
}
