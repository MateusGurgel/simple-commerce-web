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
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { register, useUserState } from "../redux/user";
import { useEffect } from "react";

interface FormProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  name: Yup.string().min(3, "Too Short!").max(255, "Too Long!").required(),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(128, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
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
    dispatch<any>(register(values.name, values.email, values.password));
    actions.setSubmitting(false);
  }

  return (
    <Center className="h-screen">
      <Box w={"sm"} py={10} px={4} shadow={"xl"}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleOnSubmit}
        >
          {(props) => (
            <Form>
              <Stack gap={1} textAlign={"center"}>
                <Field name="name">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<FormProps>;
                  }) => (
                    <FormControl
                      isInvalid={!!(form.errors.name && form.touched.name)}
                    >
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        {...field}
                        focusBorderColor="black"
                        placeholder="Name"
                        size="lg"
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
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
                        type="password"
                        size="lg"
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="confirmPassword">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<FormProps>;
                  }) => (
                    <FormControl
                      isInvalid={
                        !!(
                          form.errors.confirmPassword &&
                          form.touched.confirmPassword
                        )
                      }
                    >
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        {...field}
                        focusBorderColor="black"
                        placeholder="confirmPassword"
                        type="password"
                        size="lg"
                      />
                      <FormErrorMessage>
                        {form.errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Text fontSize="md" color="red">
                  {error}
                </Text>
                <Button disabled={isLoading}>Login</Button>
                <Link
                  href={"/login"}
                  className="underline "
                >{`Already have an account?`}</Link>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
}
