import { productList } from "../constants/productConstants";
import { Dispatch } from "redux";
import { api } from "@/app/api";

export const listProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: productList.request });

    const { data } = await api.get("products");

    dispatch({
      type: productList.success,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: productList.fail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
