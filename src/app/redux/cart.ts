import Product from "../interfaces/Product";
import { useSelector } from "react-redux";

const ADD_TO_CART = "cart/ADD_TO_CART";
const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";
const UPDATE_QUANTITY = "cart/UPDATE_QUANTITY";

// Action interfaces
interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Product;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: string; // Item ID
}

interface UpdateQuantityAction {
  type: typeof UPDATE_QUANTITY;
  payload: {
    productId: string;
    quantity: number;
  };
}

// Union type of all cart actions
type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateQuantityAction;

//Action creators
const addToCart = (product: Product): CartActionTypes => ({
  type: ADD_TO_CART,
  payload: product,
});

const removeFromCart = (productId: string): CartActionTypes => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

const updateQuantity = (
  productId: string,
  quantity: number
): CartActionTypes => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity },
});

interface CartItem {
  id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
  quantity: number;
}

type CartState = CartItem[];

const initialState: CartState = [];

const cartReducer = (
  state = initialState,
  action: CartActionTypes
): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.payload;
      //Transforming a product into an item
      const item = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        quantity: 1,
      };

      //Checking if the product exists
      const existingItem = state.find((i) => i.id === item.id);

      //adding the item or the quantity
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }

      return [...state];

    case REMOVE_FROM_CART:
      const removeItemId = action.payload;
      return state.filter((item) => item.id !== removeItemId);

    case UPDATE_QUANTITY:
      const { productId, quantity } = action.payload;
      const updatedState = state.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity };
        }

        return item;
      });
      return updatedState;

    default:
      return state;
  }
};

interface CartStateSelector {
  cart: CartState;
}

function useCartState() {
  const cartState = useSelector((state: CartStateSelector) => state);
  return cartState;
}

export { addToCart, updateQuantity, removeFromCart, useCartState };
export default cartReducer;
