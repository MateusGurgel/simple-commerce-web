"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export function Providers({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <Provider store={store}>
          <PayPalScriptProvider deferLoading={true}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </PayPalScriptProvider>
        </Provider>
      </ChakraProvider>
    </CacheProvider>
  );
}
