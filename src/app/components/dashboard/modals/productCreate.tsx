"use client";
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Textarea,
  ModalOverlay,
  FormErrorMessage,
  useToast,
  ModalHeader,
  Box,
} from "@chakra-ui/react";
import Button from "../../button";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from "formik";
import { api } from "@/app/api";
import { useState } from "react";
import * as Yup from "yup";

export interface ProductEditProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormProps {
  [key: string]: any;
  name: string;
  brand: string;
  category: string;
  description: string;
  countInStock: number;
  price: number;
}

export default function ProductCreate({ isOpen, onClose }: ProductEditProps) {
  const toast = useToast();
  const [picture, setPicture] = useState<File | undefined>();
  const [pictureError, setPictureErro] = useState<string | undefined>();

  const CreateProductSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Too Short!")
      .max(228, "Too Long!")
      .required("Required"),

    brand: Yup.string()
      .min(2, "Too Short!")
      .max(228, "Too Long!")
      .required("Required"),

    category: Yup.string()
      .min(2, "Too Short!")
      .max(228, "Too Long!")
      .required("Required"),

    description: Yup.string()
      .min(1, "Too Short!")
      .max(1000, "Too Long!")
      .required("Required"),

    countInStock: Yup.number()
      .min(0, "Too Short!")
      .max(100000, "Too Long!")
      .required("Required"),

    price: Yup.number()
      .min(0, "Too Short!")
      .max(100000, "Too Long!")
      .required("Required"),
  });

  async function handleOnSubmit(
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) {
    actions.setSubmitting(false);
    setPictureErro(undefined);
    if (!picture) {
      setPictureErro("Required");
      return;
    }
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    formData.append("image", picture);

    try {
      await api.post("products/", formData);

      toast({
        title: "Action executed successfully.",
        position: "top-right",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Something went wrong. Please try again later.",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }

    onClose();
  }

  const initialValues = {
    name: "",
    brand: "",
    category: "",
    description: "",
    countInStock: 0,
    price: 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleOnSubmit}
      validationSchema={CreateProductSchema}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader>Create product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form>
              <FormControl>
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
                      <FormLabel>Name</FormLabel>
                      <Input {...field} placeholder="Airpods" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </FormControl>

              <FormControl>
                <Field name="brand">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<FormProps>;
                  }) => (
                    <FormControl
                      isInvalid={!!(form.errors.brand && form.touched.brand)}
                    >
                      <FormLabel>Brand</FormLabel>
                      <Input {...field} placeholder="ex Apple" />
                      <FormErrorMessage>{form.errors.brand}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </FormControl>

              <FormControl>
                <Field name="category">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<FormProps>;
                  }) => (
                    <FormControl
                      isInvalid={
                        !!(form.errors.category && form.touched.category)
                      }
                    >
                      <FormLabel>Category</FormLabel>
                      <Input {...field} placeholder="Earphones" />
                      <FormErrorMessage>
                        {form.errors.category}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </FormControl>

              <FormControl>
                <Field name="countInStock">
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
                          form.errors.countInStock && form.touched.countInStock
                        )
                      }
                    >
                      <FormLabel>count in stock</FormLabel>
                      <Input {...field} placeholder="123" />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </FormControl>

              <FormControl>
                <Field name="price">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<FormProps>;
                  }) => (
                    <FormControl
                      isInvalid={!!(form.errors.price && form.touched.price)}
                    >
                      <FormLabel>price</FormLabel>

                      <Input {...field} placeholder="123" />

                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </FormControl>

              <FormControl>
                <Field name="description">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<FormProps>;
                  }) => (
                    <FormControl
                      isInvalid={
                        !!(form.errors.description && form.touched.description)
                      }
                    >
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Really good headphones"
                      />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </FormControl>

              <FormLabel>Product Picture</FormLabel>
              <FormControl isInvalid={!!pictureError}>
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      setPicture(event.currentTarget.files[0]);
                    }
                  }}
                />
                <FormErrorMessage>{pictureError}</FormErrorMessage>
              </FormControl>

              <Box m={4}>
                <Button>Create</Button>
              </Box>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Formik>
  );
}
