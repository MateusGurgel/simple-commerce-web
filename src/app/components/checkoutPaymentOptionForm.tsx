"use client";
import {
  Center,
  Radio,
  RadioGroup,
  Stack,
  Button,
  Box,
} from "@chakra-ui/react";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { login, useUserState } from "../redux/user";
import { useRouter } from "next/navigation";
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
    setNextStep()
  }

  return (
    <Stack w={"sm"} py={10} px={4} gap={10} >
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
        <Button w={"full"} onClick={handleOnConfirm} >Confirm</Button>
    </Stack>
  );
}
