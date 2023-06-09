import Product from "../interfaces/Product";
import { useSelector } from "react-redux";

const ADD_TO_CART = "cart/ADD_TO_CART";
const ADD_PAYMENT_METHOD_TO_CART = "cart/ADD_PAYMENT_METHOD_TO_CART";
const ADD_ADDRESS_TO_CART = "cart/ADD_ADDRESS_TO_CART";
const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";
const UPDATE_QUANTITY = "cart/UPDATE_QUANTITY";
const CLEAR_CART = "cart/CLEAR_CART";

// Action interfaces
interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Product;
}

interface ClearCartAction {
  type: typeof CLEAR_CART;
}

interface AddAddressToCartAction {
  type: typeof ADD_ADDRESS_TO_CART;
  payload: string;
}

interface AddPaymentMethodToCartAction {
  type: typeof ADD_PAYMENT_METHOD_TO_CART;
  payload: string;
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
  | AddAddressToCartAction
  | AddPaymentMethodToCartAction
  | RemoveFromCartAction
  | UpdateQuantityAction
  | ClearCartAction;

//Action creators
const addToCart = (product: Product): CartActionTypes => ({
  type: ADD_TO_CART,
  payload: product,
});

const clearCart = (): CartActionTypes => ({
  type: "cart/CLEAR_CART",
});

const addressToCart = (address: string): CartActionTypes => ({
  type: ADD_ADDRESS_TO_CART,
  payload: address,
});

const addPaymentMethodToCart = (address: string): CartActionTypes => ({
  type: ADD_PAYMENT_METHOD_TO_CART,
  payload: address,
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

interface CartState {
  items: CartItem[];
  address: string;
  paymentMethod: string;
}
const initialState: CartState = { items: [], address: "", paymentMethod: "" };

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
      const existingItem = state.items.find((i) => i.id === item.id);

      //adding the item or the quantity
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      return { ...state };

    case CLEAR_CART:
      return { items: [], address: "", paymentMethod: "" };

    case ADD_ADDRESS_TO_CART:
      const address = action.payload;
      return { ...state, address };

    case ADD_PAYMENT_METHOD_TO_CART:
      const paymentMethod = action.payload;
      return { ...state, paymentMethod };

    case REMOVE_FROM_CART:
      const removeItemId = action.payload;
      const updatedItems = state.items.filter(
        (item) => item.id !== removeItemId
      );
      return { ...state, items: updatedItems };

    case UPDATE_QUANTITY:
      const { productId, quantity } = action.payload;
      const updatedState = state.items.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity };
        }

        return item;
      });
      return { ...state, items: updatedState };

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

export {
  addToCart,
  updateQuantity,
  removeFromCart,
  useCartState,
  addressToCart,
  addPaymentMethodToCart,
  clearCart,
};
export default cartReducer;
