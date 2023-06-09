import { Box, HStack, Heading, Text, Spacer, Divider } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineCheckCircle, AiOutlineFieldTime } from "react-icons/ai";

interface OrderItemCardProps {
  id: number;
  is_paid: boolean;
  payment_method: string;
  created_at: string;
}

export default function OrderCard(props: OrderItemCardProps) {
  return (
    <Link href={`orders/${props.id}`}>
      <HStack w="full" py={4} px={16} gap={8} shadow="lg">
        <Box p={4}>
          <Heading as="h4" size="md" fontWeight="light">
            {props.payment_method}
          </Heading>
          <Text fontWeight={"semibold"}>
            {new Date(props.created_at).toLocaleDateString()}
          </Text>
        </Box>

        <Spacer />

        {props.is_paid ? (
          <AiOutlineCheckCircle fontSize={100} />
        ) : (
          <AiOutlineFieldTime fontSize={100} />
        )}
      </HStack>
    </Link>
  );
}
