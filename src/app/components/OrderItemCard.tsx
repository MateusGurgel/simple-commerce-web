import Image from "next/image";
import { Box, HStack, Heading, Text, Spacer } from "@chakra-ui/react";
import { title } from "process";

interface OrderItemCardProps {
  image: string;
  brand: string;
  title: string;
  price: string;
}

export default function OrderItemCard(props: OrderItemCardProps) {
  return (
    <HStack w="full" py={4} px={16} gap={8} shadow="lg">
      <Image src={props.image} alt="" width={237} height={162} />

      <Box>
        <Heading as="h4" size="md" fontWeight="light">
          {props.brand}
        </Heading>
        <Text fontWeight={"semibold"}>{props.title}</Text>
      </Box>

      <Spacer />

      <Heading float={"right"} as="h1" size="lg" fontWeight="semibold">
        {`$ ${props.price}`}
      </Heading>
    </HStack>
  );
}
