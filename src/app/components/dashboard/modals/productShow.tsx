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
} from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";

export interface ProductShowProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function ProductShow({
  isOpen,
  onClose,
  product,
}: ProductShowProps) {
  if (!product) {
    return <></>;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pb={4}>
        <ModalHeader>{`Product: ${product.id}`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input value={product.name} disabled />
          </FormControl>
          <FormControl>
            <FormLabel>Brand</FormLabel>
            <Input value={product.brand} disabled />
          </FormControl>
          <FormControl>
            <FormLabel>category</FormLabel>
            <Input value={product.category} disabled />
          </FormControl>
          <FormControl>
            <FormLabel>count in stock</FormLabel>
            <NumberInput defaultValue={15} min={10} max={20} isDisabled>
              <NumberInputField value={product.count_in_stock} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <NumberInput defaultValue={15} min={10} max={20} isDisabled>
              <NumberInputField value={product.price} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea disabled value={product.description} />
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
