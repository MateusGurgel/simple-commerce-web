"use client";
import Order from "@/app/interfaces/Order";
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
import { useRouter } from "next/navigation";
import { HiChevronDoubleDown } from "react-icons/hi";

export interface OrderPainelProps {
  orders: Order[] | undefined;
}

export default function OrderPainel({ orders }: OrderPainelProps) {
  const router = useRouter();

  async function handleShowOrder(orderId: string) {
    router.push("/orders/" + orderId);
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Creation Date</Th>
            <Th>Owner ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders?.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{new Date(order.created_at).toLocaleDateString()}</Td>
              <Td>{order.user_id}</Td>
              <Td>
                <Box>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<HiChevronDoubleDown />}>
                      Actions
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => handleShowOrder(order.id)}>
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
  );
}
