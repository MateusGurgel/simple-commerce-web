"use client";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Stack,
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
import { addressToCart } from "../redux/cart";

interface ShippingFormProps{
    setNextStep: () => void
}

interface FormProps {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const SignInSchema = Yup.object().shape({
  address: Yup.string()
    .min(3, "Too Short!")
    .max(128, "Too Long!")
    .required("Required"),

  city: Yup.string()
    .min(3, "Too Short!")
    .max(58, "Too Long!")
    .required("Required"),

  postalCode: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),

  country: Yup.string()
    .min(3, "Too Short!")
    .max(26, "Too Long!")
    .required("Required"),
});

export default function ShippingForm({setNextStep} : ShippingFormProps) {
  const dispatch = useDispatch();

  function handleOnSubmit(
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) {
    const addressValue = `${values.address}, ${values.city}, ${values.country}, ${values.postalCode}`
    dispatch<any>(addressToCart(addressValue));
    setNextStep();
    actions.setSubmitting(false);
  }

  return (
    <Box w={"sm"} py={10} px={4}>
      <Formik
        initialValues={{ address: "", city: "", postalCode: "", country: "" }}
        validationSchema={SignInSchema}
        onSubmit={handleOnSubmit}
      >
        {(props) => (
          <Form>
            <Stack gap={5} textAlign={"center"}>
              <Field name="address">
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: FormikProps<FormProps>;
                }) => (
                  <FormControl
                    isInvalid={!!(form.errors.address && form.touched.address)}
                  >
                    <FormLabel>Address</FormLabel>
                    <Input
                      {...field}
                      focusBorderColor="black"
                      placeholder="Adress"
                      size="lg"
                    />
                    <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="city">
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: FormikProps<FormProps>;
                }) => (
                  <FormControl
                    isInvalid={
                      !!(form.errors.city && form.touched.city)
                    }
                  >
                    <FormLabel>City</FormLabel>
                    <Input
                      {...field}
                      focusBorderColor="black"
                      placeholder="City"
                      size="lg"
                    />
                    <FormErrorMessage>{form.errors.city}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="postalCode">
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: FormikProps<FormProps>;
                }) => (
                  <FormControl
                    isInvalid={
                      !!(form.errors.postalCode && form.touched.postalCode)
                    }
                  >
                    <FormLabel>Postal Code</FormLabel>
                    <Input
                      {...field}
                      focusBorderColor="black"
                      placeholder="Postal Code"
                      size="lg"
                    />
                    <FormErrorMessage>{form.errors.postalCode}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="country">
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: FormikProps<FormProps>;
                }) => (
                  <FormControl
                    isInvalid={
                      !!(form.errors.country && form.touched.country)
                    }
                  >
                    <FormLabel>Country</FormLabel>
                    <Input
                      {...field}
                      focusBorderColor="black"
                      placeholder="Country"
                      size="lg"
                    />
                    <FormErrorMessage>{form.errors.country}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button type="submit">Confirm</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
