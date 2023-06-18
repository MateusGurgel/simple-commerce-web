"use client";
import { api } from "@/app/api";
import Product from "@/app/interfaces/Product";
import { useUserState } from "@/app/redux/user";
import { Box } from "@chakra-ui/react";

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

export interface ProductPainelProps {
  products: Product[] | undefined;
}

export default function ProductPainel({ products }: ProductPainelProps) {
  const toast = useToast();

  return (
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
                    <MenuButton as={Button} rightIcon={<HiChevronDoubleDown />}>
                      Actions
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Delete</MenuItem>
                      <MenuItem>Edit</MenuItem>
                      <MenuItem>Show Details</MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
