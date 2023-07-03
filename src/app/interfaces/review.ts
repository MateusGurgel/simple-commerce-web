export default interface Review {
  id: number;
  user_id: number;
  product_id: string;
  order_product_id: string;

  user_name: string;
  title: string;

  message: string;
  rate: number;
  created_at: number;
  updated_at: number;
}
