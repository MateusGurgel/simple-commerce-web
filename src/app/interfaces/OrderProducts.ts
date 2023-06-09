import Product from "./Product";

export default interface OrderProduct {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: Product;
}
