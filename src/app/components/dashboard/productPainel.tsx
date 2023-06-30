"use client";
import { api } from "@/app/api";
import Product from "@/app/interfaces/Product";
import { Box, Button, useDisclosure } from "@chakra-ui/react";

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
  useToast,
} from "@chakra-ui/react";
import { HiChevronDoubleDown } from "react-icons/hi";
import { useState } from "react";
import ProductShow from "./modals/productShow";
import ProductEdit from "./modals/productEdit";
import BlackButton from "../button";

import ProductCreate from "./modals/productCreate";

export interface ProductPainelProps {
  products: Product[] | undefined;
}

export default function ProductPainel({ products }: ProductPainelProps) {
  const {
    isOpen: isShowOpen,
    onOpen: onShowOpen,
    onClose: onShowClose,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const toast = useToast();

  async function handleShowDetails(productId: string) {
    try {
      const order = await api.get<Product>("/products/" + productId);
      setSelectedProduct(order.data);
      onShowOpen();
    } catch (error) {
      toast({
        title: "Something went wrong. Please try again later.",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  }

  async function handleCreateProduct() {
    try {
      //OpenModal
      onCreateOpen();
    } catch (error) {
      toast({
        title: "Something went wrong. Please try again later.",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  }

  async function handleEditProduct(productId: string) {
    try {
      const order = await api.get<Product>("/products/" + productId);
      setSelectedProduct(order.data);
      onEditOpen();
    } catch (error) {
      toast({
        title: "Something went wrong. Please try again later.",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  }

  async function handleDeleteProduct(productId: string) {
    try {
      await api.delete("/products/" + productId);
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
  }

  return (
    <>
      <ProductShow
        isOpen={isShowOpen}
        onClose={onShowClose}
        product={selectedProduct}
      />
      <ProductEdit
        isOpen={isEditOpen}
        onClose={onEditClose}
        product={selectedProduct}
      />
      <ProductCreate isOpen={isCreateOpen} onClose={onCreateClose} />

      <BlackButton OnClick={handleCreateProduct}>Create</BlackButton>

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
                        <MenuItem
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </MenuItem>
                        <MenuItem onClick={() => handleEditProduct(product.id)}>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleShowDetails(product.id)}>
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
