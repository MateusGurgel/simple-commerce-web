"use client";

import {
  Box,
  Flex,
  FormLabel,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import useSWR from "swr";
import { fetcher } from "../api";
import useAuth from "../hooks/useAuth";
import Order from "../interfaces/Order";
import { useUserState } from "../redux/user";
import OrderCard from "../components/orderCard";

export default function Home() {
  useAuth();

  const { user } = useUserState();
  const { data: orders } = useSWR<Order[]>("/myOrders", fetcher);

  return (
    <Flex justifyContent={"center"} p={"16"}>
      <Box>
        <Tabs isFitted variant="unstyled">
          <TabList>
            <Tab _selected={{ color: "white", bg: "black" }}>Profile</Tab>
            <Tab _selected={{ color: "white", bg: "black" }}>Orders</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box w={"sm"} py={10} px={4} shadow={"xl"}>
                <Box>
                  <FormLabel>Email</FormLabel>
                  <Input
                    focusBorderColor="black"
                    placeholder="example@gmail.com"
                    size="lg"
                    value={user?.email}
                  />
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    focusBorderColor="black"
                    placeholder="Name"
                    size="lg"
                    value={user?.name}
                  />
                </Box>
              </Box>
            </TabPanel>

            <TabPanel>
              <Box w={"sm"} py={10} px={4} shadow={"xl"}>
                {orders ? (
                  orders.map((order) => (
                    <OrderCard
                      key={order.id}
                      id={order.id}
                      is_paid={order.is_paid}
                      payment_method={order.payment_method}
                      created_at={order.created_at}
                    />
                  ))
                ) : (
                  <h1>There are no orders available at the moment.</h1>
                )}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
