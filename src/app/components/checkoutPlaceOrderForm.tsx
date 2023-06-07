"use client";
import { Radio, RadioGroup, Stack, Button, Heading } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addPaymentMethodToCart, clearCart } from "../redux/cart";
import { api } from "../api";
import useAuth from "../hooks/useAuth";

interface ShippingFormProps {
  setNextStep: () => void;
}

export default function CheckoutPlaceOrderForm({
  setNextStep,
}: ShippingFormProps) {
  useAuth();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState<string>("PayPal");

  async function handleOnConfirm() {
    dispatch<any>(addPaymentMethodToCart(paymentMethod));

    try {
      await api.post("orders", {
        shippingAddress: "abogus",
        paymentMethod: "PayPal  ",
        products: [
          { productId: 1, quantity: 20 },
          { productId: 1, quantity: 20 },
        ],
      });

      dispatch<any>(clearCart());
      setNextStep();
    } catch (error) {}
  }

  return (
    <Stack w={"sm"} py={10} px={4} gap={5}>
      <Heading size={"sm"} fontWeight={"semibold"}>
        Payment Method
      </Heading>
      <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
        <Stack>
          <Radio value="PayPal" colorScheme="blackAlpha">
            PayPal or CreditCard
          </Radio>
          <Radio value="Stripe" colorScheme="blackAlpha">
            Stripe
          </Radio>
        </Stack>
      </RadioGroup>
      <Button w={"full"} onClick={handleOnConfirm}>
        Place Order
      </Button>
    </Stack>
  );
}
