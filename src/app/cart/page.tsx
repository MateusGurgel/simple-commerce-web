"use client";

import { VStack, Box, HStack, Heading } from "@chakra-ui/react";
import Button from "../components/button";
import OrderItemCard from "../components/OrderItemCard";

export default function Home() {
  return (
    <VStack px="10%" py={8} gap={10}>
      <OrderItemCard
        image="/placeholder.jpg"
        brand="Apple"
        title="AirPods"
        price="974.23"
      />

      <HStack w="full" py={4} px={16} gap={6} shadow="lg">
        <Button>Buy</Button>

        <Box bg="green.100" textColor="green.700" minW={200} p={4}>
          <h6>Total Value</h6>
          <Heading as="h1" size="lg" fontWeight="semibold">
            R$ 2.599,99
          </Heading>
        </Box>
      </HStack>
    </VStack>
  );
}
