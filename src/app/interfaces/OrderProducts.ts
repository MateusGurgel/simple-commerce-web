import Product from "./Product";
import Review from "./review";

export default interface OrderProduct {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  review: Review;
  product: Product;
}
