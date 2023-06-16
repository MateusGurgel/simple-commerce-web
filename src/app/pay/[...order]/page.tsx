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
  VStack,
} from "@chakra-ui/react";
import useAuth from "@/app/hooks/useAuth";
import Order from "@/app/interfaces/Order";
import LoadingScreen from "@/app/components/loadingScreen";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import PaypalInfo from "@/app/interfaces/PaypalInfo";

interface ordersProps {
  params: {
    order: string;
  };
}

export default function Home({ params }: ordersProps) {
  useAuth();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { data: order, isLoading: orderIsLoading } = useSWR<Order>(
    "/orders/" + params.order,
    fetcher
  );

  const { data: paypalInfo, isLoading: paypalIsLoading } = useSWR<PaypalInfo>(
    "api/config/paypal",
    fetcher
  );

  useEffect(() => {
    if (!paypalIsLoading && paypalInfo) {
      paypalDispatch({
        type: "resetOptions",
        value: {
          clientId: paypalInfo.clientId,
          components: "buttons",
          currency: "USD",
          intent: "capture",
          vault: false,
        },
      });
    }
  }, [paypalIsLoading, paypalInfo]);

  if (orderIsLoading || paypalIsLoading || !order || isPending) {
    return <LoadingScreen />;
  }

  return (
    <Center textAlign="center" p={12}>
      <VStack gap={6}>
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

        <PayPalButtons />
      </VStack>
    </Center>
  );
}
