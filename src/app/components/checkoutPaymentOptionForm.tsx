"use client";
import {
  Center,
  Radio,
  RadioGroup,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { FormEvent, useEffect, useState } from "react";
import { addPaymentMethodToCart } from "../redux/cart";

interface ShippingFormProps {
  setNextStep: () => void;
}

export default function CheckoutPaymentOptionForm({
  setNextStep,
}: ShippingFormProps) {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState<string>("PayPal");

  function handleOnConfirm() {
    dispatch<any>(addPaymentMethodToCart(paymentMethod));
    setNextStep();
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
