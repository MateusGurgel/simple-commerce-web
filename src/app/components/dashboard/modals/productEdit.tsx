"use client";
import Product from "@/app/interfaces/Product";
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Textarea,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  FormErrorMessage,
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

export interface ProductEditProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

interface FormProps {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  countInStock: number;
  price: number;
}

async function handleOnSubmit(
  values: FormProps,
  actions: FormikHelpers<FormProps>
) {
  console.log(values);
  await api.patch("products/" + values.id, values);
  actions.setSubmitting(false);
}

export default function ProductEdit({
  isOpen,
  onClose,
  product,
}: ProductEditProps) {
  if (!product) {
    return <></>;
  }
  const initialValues = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    description: product.description,
    countInStock: product.count_in_stock,
    price: product.price,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader>{`Product: ${product.id}`}</ModalHeader>
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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

                      <Input {...field} />

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
                      <Textarea {...field} />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </FormControl>

              <Button>Edit</Button>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Formik>
  );
}
