import { api } from "@/app/api";
import { clearCart, useCartState } from "@/app/redux/cart";
import { Button, Heading, Stack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

export default function CheckoutPlaceOrder() {
  const { cart } = useCartState();
  const dispatch = useDispatch();

  async function handlePlaceOrder() {
    try {
      await api.post("orders", {
        shippingAddress: cart.address,
        paymentMethod: cart.paymentMethod,
        products: cart.items.map(({ id, quantity }) => ({
          productId: id,
          quantity,
        })),
      });

      dispatch<any>(clearCart());
      //do something
    } catch (error) {}
  }

  return (
    <Stack w={"sm"} py={10} px={4} gap={5}>
      <Heading size={"sm"} fontWeight={"semibold"}>
        Confirm Order
      </Heading>
      <Button w={"full"} onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </Stack>
  );
}
