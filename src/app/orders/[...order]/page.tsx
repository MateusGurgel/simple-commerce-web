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
  VStack,
  Center,
  Heading,
  Divider,
  SimpleGrid,
  TableContainer,
  Spinner,
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
    <Center textAlign="center">
      <SimpleGrid columns={[1, null, 2]} m="10" spacing={10}>
        <VStack maxW={600} alignItems={"flex-start"} gap="2">
          <Heading fontWeight="semibold" as="h1" size="md">
            Order: {order.id}
          </Heading>
          <br />
          <Heading fontWeight="normal" as="h2" size="md">
            Shipping
          </Heading>
          <h2>Address: {order.shipping_address}</h2>
          <Divider orientation="horizontal" />
          <Heading fontWeight="semibold" as="h1" size="md">
            Payment Method
          </Heading>
          <h2>Method: {order.payment_method}</h2>
          <h2>is Paid: {order.is_paid ? "yes" : "not yet"}</h2>
        </VStack>
        <VStack
          maxW={600}
          maxH={850}
          overflow="auto"
          alignItems={"flex-start"}
          gap="4"
        >
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
          <TableContainer>
            <Heading fontWeight="semibold" as="h2" size="md">
              ORDER ITEMS
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th isNumeric>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {order.orderProduct.map((orderProduct) => (
                  <Tr key={orderProduct.id}>
                    <Td>{orderProduct.product.name}</Td>
                    <Td>{orderProduct.quantity}</Td>
                    <Td>{orderProduct.product.price}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </SimpleGrid>
    </Center>
  );
}
