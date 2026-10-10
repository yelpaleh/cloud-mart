import type { Product } from '../types/ecommerce'
const baseUrl = 'https://dummyjson.com';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${baseUrl}/products`);
  const data = await response.json();

if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch products');
  }

  return data.products;
}