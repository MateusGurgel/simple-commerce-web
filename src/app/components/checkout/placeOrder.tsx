import { api } from "@/app/api";
import Order from "@/app/interfaces/Order";
import { clearCart, useCartState } from "@/app/redux/cart";
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function CheckoutPlaceOrder() {
  const { cart } = useCartState();
  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();

  async function handlePlaceOrder() {
    try {
      const order = await api.post<Order>("orders", {
        shippingAddress: cart.address,
        paymentMethod: cart.paymentMethod,
        products: cart.items.map(({ id, quantity }) => ({
          productId: id,
          quantity,
        })),
      });

      await dispatch<any>(clearCart());

      router.push(`pay/${order.data.id}`);
    } catch (error) {
      toast({
        title: "An error has occurred, please try again later",
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    }
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

      <Button w={"full"} onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </Stack>
  );
}
