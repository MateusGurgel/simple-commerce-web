"use client";

import { fetcher } from "@/app/api";
import useSWR from "swr";
import {
  Tr,
  Th,
  Td,
  Tbody,
  Table,
  Thead,
  Center,
  Heading,
  TableContainer,
} from "@chakra-ui/react";
import useAuth from "@/app/hooks/useAuth";
import Order from "@/app/interfaces/Order";
import LoadingScreen from "@/app/components/loadingScreen";

interface ordersProps {
  params: {
    order: string;
  };
}

export default function Home({ params }: ordersProps) {
  useAuth();

  const { data: order, isLoading } = useSWR<Order>(
    "/orders/" + params.order,
    fetcher
  );

  if (isLoading || !order) {
    return <LoadingScreen />;
  }

  return (
    <Center textAlign="center" p={12}>
      <TableContainer>
        <Heading fontWeight="semibold" as="h2" size="md">
          ORDER SUMMARY
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th isNumeric>Items</Th>
              <Th isNumeric>Shipping</Th>
              <Th isNumeric>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{order.total_price}</Td>
              <Td>0</Td>
              <Td>{order.total_price}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
}
