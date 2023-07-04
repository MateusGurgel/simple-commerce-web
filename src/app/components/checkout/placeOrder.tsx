import useSWR from "swr";
import { useEffect } from "react";
import { api, fetcher } from "@/app/api";
import Order from "@/app/interfaces/Order";
import { useRouter } from "next/navigation";
import LoadingScreen from "../loadingScreen";
import { clearCart, useCartState } from "@/app/redux/cart";
import PaypalInfo from "@/app/interfaces/PaypalInfo";
import { Box, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";

export default function CheckoutPlaceOrder() {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { cart } = useCartState();
  const toast = useToast();
  const router = useRouter();

  const { data: paypalInfo, isLoading: paypalIsLoading } = useSWR<PaypalInfo>(
    "api/paypal/config",
    fetcher
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!paypalIsLoading && paypalInfo) {
      paypalDispatch({
        type: "resetOptions",
        value: {
          clientId: paypalInfo.clientId,
          components: "buttons",
          currency: "BRL",
          vault: false,
        },
      });
    }
  }, [paypalIsLoading, paypalInfo]);

  async function PlaceOrder() {
    return await api
      .post<Order>("orders", {
        shippingAddress: cart.address,
        paymentMethod: cart.paymentMethod,
        products: cart.items.map(({ id, quantity }) => ({
          productId: id,
          quantity,
        })),
      })
      .then((order) => {
        return order.data.check_out_order_id;
      });
  }

  async function handleOnAprove(data: any) {
    return await api
      .post<any>(`api/paypal/capturePayment`, {
        id: data.orderID,
      })
      .then(() => {
        dispatch<any>(clearCart());

        toast({
          title:
            "Purchase successful! Your order has been confirmed and is being processed.",
          position: "top-right",
          status: "success",
          isClosable: true,
        });

        router.push("/");
      });
  }

  if (isPending) {
    return <LoadingScreen />;
  }

  return (
    <Stack w={"sm"} py={10} px={4} gap={5}>
      <Heading size={"sm"} fontWeight={"semibold"}>
        Confirm Order
      </Heading>

      <Box>
        <Text mb="8px">Address:</Text>
        <Input value={cart.address} disabled />
        <Text mb="8px">Payment Method:</Text>
        <Input value={cart.paymentMethod} disabled />
      </Box>

      <PayPalButtons createOrder={PlaceOrder} onApprove={handleOnAprove} />
    </Stack>
  );
}
