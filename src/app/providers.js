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
          <PayPalScriptProvider
            options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
          >
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </PayPalScriptProvider>
        </Provider>
      </ChakraProvider>
    </CacheProvider>
  );
}
