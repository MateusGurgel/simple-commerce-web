"use client";
import { api } from "@/app/api";
import Product from "@/app/interfaces/Product";
import { useUserState } from "@/app/redux/user";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useToast,
} from "@chakra-ui/react";
import { HiChevronDoubleDown } from "react-icons/hi";
import OrderShow from "./modals/productShow";
import { useState } from "react";
import Order from "@/app/interfaces/Order";
import ProductShow from "./modals/productShow";

export interface ProductPainelProps {
  products: Product[] | undefined;
}

export default function ProductPainel({ products }: ProductPainelProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const toast = useToast();

  async function showDetails(productId: string) {
    try {
      const order = await api.get<Product>("/products/" + productId);
      setSelectedProduct(order.data);
      onOpen();
    } catch (error) {
      toast({
        title: "Something went wrong. Please try again later.",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  }

  return (
    <>
      <ProductShow
        isOpen={isOpen}
        onClose={onClose}
        product={selectedProduct}
      />

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Quantity on stock</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products?.map((product) => (
              <Tr key={product.id}>
                <Td>{product.name}</Td>
                <Td>{product.count_in_stock}</Td>
                <Td>
                  <Box>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<HiChevronDoubleDown />}
                      >
                        Actions
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem onClick={() => showDetails(product.id)}>
                          Show Details
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
