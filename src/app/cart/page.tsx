"use client";

import { VStack, Box, HStack, Heading } from "@chakra-ui/react";
import Button from "../components/button";
import OrderItemCard from "../components/OrderItemCard";
import { useState } from "react";
import { useCartState } from "../redux/cart";

export default function Home() {
  const [totalValue, setTotalValue] = useState("");
  const cartState = useCartState()

  return (
    <VStack px="10%" py={8} gap={10}>


      {cartState.cart && cartState.cart.map((item) => (
      <OrderItemCard
        key={item.id}
        image={item.image}
        brand={'apple'}
        title={item.name}
        price={item.price}
      />
      ))}


      <HStack w="full" py={4} px={16} gap={6} shadow="lg">
        <Button>Buy</Button>

        <Box bg="green.100" textColor="green.700" minW={200} p={4}>
          <h6>Total Value</h6>
          <Heading as="h1" size="lg" fontWeight="semibold">
            R$ {totalValue}
          </Heading>
        </Box>
      </HStack>
    </VStack>
  );
}
