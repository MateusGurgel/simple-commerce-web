import OrderProduct from "./OrderProducts";

export default interface Order {
  id: number;
  check_out_order_id: string;
  is_paid: boolean;
  user_id: number;
  shipping_address: string;
  payment_method: string;
  total_price: number;
  created_at: string;
  updated_at: string;
  orderProduct: OrderProduct[];
}
