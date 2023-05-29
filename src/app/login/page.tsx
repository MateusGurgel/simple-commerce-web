"use client";

import {
  Box,
  Input,
  Center,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
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
import { useDispatch } from "react-redux";
import { login, useUserState } from "../redux/user";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, error, user } = useUserState();

  useEffect(() => {
    if (user && router){
      router.push("/")
    }
  }, [user, router])

  function handleOnSubmit(
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) {
    dispatch<any>(login(values.email, values.password));
    actions.setSubmitting(false);
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
                        type="password"
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
                <Text fontSize="md" color="red">
                  {error}
                </Text>
                <Button disabled={isLoading}>Login</Button>
                <Link
                  href={"/register"}
                  className="underline"
                >{`Don't have an account yet?`}</Link>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
}
