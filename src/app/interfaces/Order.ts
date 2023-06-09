interface Order {
  id: number;
  is_paid: boolean;
  user_id: number;
  shipping_address: string;
  payment_method: string;
  total_price: number;
  created_at: string;
  updated_at: string;
}
