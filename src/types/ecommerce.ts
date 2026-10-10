export interface Product {
  id: number
  title: string
  rating: number | string
  price: number
  category: string
  thumbnail: string
}
export interface CartItem extends Product {
  quantity: number
}