import { productList } from "../constants/productConstants";

interface Product {
  Name: string;
  ImageURL: string;
}

const initialState = {
  loading: false,
  products: [] as Product[],
  error: "",
};

const productListReducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case productList.request:
      return { ...state, loading: true, products: [] };
    case productList.request:
      return { ...state, loading: false, products: action.payload };
    case productList.fail:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export { productListReducer };
