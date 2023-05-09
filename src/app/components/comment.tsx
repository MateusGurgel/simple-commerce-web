import { Heading, Text, Flex, Box } from "@chakra-ui/react";
import Rating from "./rating";

interface ItemCardProps {
  name: string;
  title: string;
  description: string;
  date: string;
  rate: number;
}

export default function Comment(props: ItemCardProps) {
  return (
    <Box w="full" shadow="md" p={4} gap={4}>
      <article>
        <Flex gap={1}>
          <Heading size="sm">{props.name}</Heading>
          <Heading size="sm">{"-"}</Heading>
          <Heading size="sm">{props.title}</Heading>
          <Rating rate={5} />
        </Flex>
        <br />

        <Text fontSize="xs">{props.description}</Text>
        <br />
        <Text fontSize="sm" fontWeight="semibold">
          {props.date}
        </Text>
      </article>
    </Box>
  );
}
