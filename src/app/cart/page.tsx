"use client";

import { VStack, Box, HStack, Heading, Divider } from "@chakra-ui/react";
import Button from "../components/button";
import OrderItemCard from "../components/OrderItemCard";
import { useEffect, useState } from "react";
import { useCartState } from "../redux/cart";

export default function Home() {
  const cartState = useCartState();
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    setTotalValue(0);
    cartState.cart.items.forEach((item) => {
      setTotalValue((prev) => prev + item.price * item.quantity);
    });
  }, [cartState]);

  return (
    <VStack px="10%" py={8} gap={10}>
      {cartState.cart &&
        cartState.cart.items.map((item) => (
          <OrderItemCard
            key={item.id}
            quantity={item.quantity}
            image={item.image}
            brand={item.brand}
            title={item.name}
            price={item.price}
          />
        ))}

      <HStack w="full" py={4} px={16} gap={6} shadow="lg">
        <Button>Buy</Button>
        <Box p={4} minW={140}>
          <h6>Total Value</h6>
          <Heading as="h1" size="md" fontWeight="semibold">
            R$ {totalValue.toString().substring(0, 6)}
          </Heading>
        </Box>
      </HStack>
    </VStack>
  );
}
