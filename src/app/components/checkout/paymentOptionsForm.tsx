"use client";
import { Radio, RadioGroup, Stack, Button, Heading } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import useAuth from "@/app/hooks/useAuth";
import { addPaymentMethodToCart } from "@/app/redux/cart";

interface ShippingFormProps {
  setNextStep: () => void;
}

export default function CheckoutPaymentOptionsForm({
  setNextStep,
}: ShippingFormProps) {
  useAuth();

  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState<string>("PayPal");

  async function handleOnConfirm() {
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
        Confirm
      </Button>
    </Stack>
  );
}
