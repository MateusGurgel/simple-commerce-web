import Image from "next/image";
import { Box, HStack, Heading, Text, Spacer } from "@chakra-ui/react";
import { endPoint } from "../constants";

interface OrderItemCardProps {
  image: string;
  brand: string;
  title: string;
  price: number;
  quantity: number;
}

export default function OrderItemCard(props: OrderItemCardProps) {
  return (
    <HStack w="full" py={4} px={16} gap={8} shadow="lg">
      <Image src={endPoint + props.image} alt="" width={237} height={162} />

      <Box borderRight={"1px"} p={4}>
        <Heading as="h4" size="md" fontWeight="light">
          {props.brand}
        </Heading>
        <Text fontWeight={"semibold"}>{props.title}</Text>
      </Box>
      <Text>{props.quantity}</Text>

      <Spacer />

      <Heading float={"right"} as="h1" size="lg" fontWeight="normal">
        {`$ ${props.price}`}
      </Heading>
    </HStack>
  );
}
