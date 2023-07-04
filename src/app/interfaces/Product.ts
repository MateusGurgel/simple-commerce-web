import OrderProduct from "./OrderProducts";
import Review from "./review";

export default interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  count_in_stock: number;
  price: number;
  rate: number;
  description: string;
  created_at: string;
  updated_at: string;
  orderProducts: OrderProduct[];
}
