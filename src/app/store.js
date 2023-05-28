import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import cartReducer from "./redux/cart";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import userReducer from "./redux/user";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [thunk];

const initialState = {};

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
