"use client";

import {
    Box,
  Center, FormControl, FormErrorMessage, FormLabel, Input, Link, Stack,
} from "@chakra-ui/react";
import { Field, FieldInputProps, Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import Button from "../components/button";


const UpdateSchema = Yup.object().shape({
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

  interface FormProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

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
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={UpdateSchema}
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
                        size="lg"
                      />
                      <FormErrorMessage>
                        {form.errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button>Update</Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
}
