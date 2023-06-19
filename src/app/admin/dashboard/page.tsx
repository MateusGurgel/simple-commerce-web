"use client";

import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import ProductPainel from "@/app/components/dashboard/productPainel";
import OrderPainel from "@/app/components/dashboard/orderPainel";
import UserPainel from "@/app/components/dashboard/userPainel";
import useAdminAuth from "@/app/hooks/useAdminAuth";
import Product from "@/app/interfaces/Product";
import Order from "@/app/interfaces/Order";
import User from "@/app/interfaces/User";
import { fetcher } from "@/app/api";
import useSWR from "swr";

export default function Home() {
  useAdminAuth();

  const { data: users, isLoading: isLoadingUsers } = useSWR<User[]>(
    "/users",
    fetcher
  );
  const { data: products, isLoading: isLoadingProducts } = useSWR<Product[]>(
    "/products",
    fetcher
  );
  const { data: orders, isLoading: isLoadingOrders } = useSWR<Order[]>(
    "/orders",
    fetcher
  );

  return (
    <Box p={12}>
      <Tabs isFitted variant="unstyled">
        <TabList>
          <Tab _selected={{ color: "white", bg: "black" }}>Users</Tab>
          <Tab _selected={{ color: "white", bg: "black" }}>Products</Tab>
          <Tab _selected={{ color: "white", bg: "black" }}>Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserPainel users={users} />
          </TabPanel>
          <TabPanel>
            <ProductPainel products={products} />
          </TabPanel>
          <TabPanel>
            <OrderPainel orders={orders} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
