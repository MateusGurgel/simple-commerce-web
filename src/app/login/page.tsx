"use client";

import {
  Box,
  Input,
  Center,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import Button from "../components/button";
import Link from "next/link";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from "formik";
import * as Yup from "yup";

interface FormProps {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .max(128, "Too Long!")
    .required("Required"),

  email: Yup.string().email("Invalid email").required("Required"),
});

export default function Home() {
  function handleOnSubmit(
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  }

  return (
    <Center className="h-screen">
      <Box w={"sm"} py={10} px={4} shadow={"xl"}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={handleOnSubmit}
        >
          {(props) => (
            <Form>
              <Stack gap={5} textAlign={"center"}>
                <Field name="email">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<FormProps>;
                  }) => (
                    <FormControl
                      isInvalid={!!(form.errors.email && form.touched.email)}
                    >
                      <FormLabel>E-mail</FormLabel>
                      <Input
                        {...field}
                        focusBorderColor="black"
                        placeholder="Email"
                        size="lg"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<FormProps>;
                  }) => (
                    <FormControl
                      isInvalid={
                        !!(form.errors.password && form.touched.password)
                      }
                    >
                      <FormLabel>Password</FormLabel>
                      <Input
                        {...field}
                        focusBorderColor="black"
                        placeholder="Password"
                        size="lg"
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button>Login</Button>
                <Link
                  href={"/register"}
                  className="underline "
                >{`Don't have an account yet?`}</Link>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
}
