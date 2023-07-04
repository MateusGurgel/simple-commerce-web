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
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from "formik";
import { api } from "@/app/api";
import * as Yup from "yup";
import Button from "./button";

export interface ProductEditProps {
  isOpen: boolean;
  onClose: () => void;
  orderProductId: number | undefined;
}

interface FormProps {
  [key: string]: any;
  title: string;
  message: string;
  rate: number;
  orderProductId: number;
}

export default function ProductCreate({
  isOpen,
  onClose,
  orderProductId,
}: ProductEditProps) {
  const toast = useToast();

  const CreateProductSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Too Short!")
      .max(228, "Too Long!")
      .required("Required"),

    message: Yup.string()
      .min(2, "Too Short!")
      .max(228, "Too Long!")
      .required("Required"),

    rate: Yup.number().min(0).max(5),
  });

  async function handleOnSubmit(
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) {
    actions.setSubmitting(false);

    try {
      await api.post("reviews/", { ...values, orderProductId: orderProductId });

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
    title: "",
    message: "",
    rate: 0,
    orderProductId: 0,
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
          <ModalHeader>Rate our product!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form>
              <FormControl>
                <Field name="title">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<FormProps>;
                  }) => (
                    <FormControl
                      isInvalid={!!(form.errors.title && form.touched.title)}
                    >
                      <FormLabel>Title</FormLabel>
                      <Input {...field} placeholder="Pretty Cool Product" />
                      <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </FormControl>

              <FormControl>
                <Field name="message">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<FormProps>;
                  }) => (
                    <FormControl
                      isInvalid={
                        !!(form.errors.message && form.touched.message)
                      }
                    >
                      <FormLabel>Message</FormLabel>
                      <Input
                        {...field}
                        placeholder="This product is pretty cool"
                      />
                      <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </FormControl>

              <FormControl>
                <Field name="rate">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<FormProps>;
                  }) => (
                    <FormControl
                      isInvalid={!!(form.errors.rate && form.touched.rate)}
                    >
                      <FormLabel>Rate</FormLabel>
                      <Input {...field} placeholder="Rate" />
                      <FormErrorMessage>{form.errors.rate}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </FormControl>

              <Box m={4}>
                <Button>Send</Button>
              </Box>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Formik>
  );
}
