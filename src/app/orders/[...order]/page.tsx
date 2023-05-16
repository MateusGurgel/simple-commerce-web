"use client";

import Button from "@/app/components/button";
import Comment from "@/app/components/comment";
import Rating from "@/app/components/rating";
import {
  Heading,
  SimpleGrid,
  Divider,
  VStack,
  Center,
  Table,
  Tr,
  Thead,
  Th,
  Td,
  Tbody,
  TableContainer,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <Center textAlign="center">
      <SimpleGrid m="10" columns={[1, 2]} spacing={10}>
        <VStack maxW={600} alignItems={"flex-start"} gap="2">
          <Heading fontWeight="semibold" as="h1" size="md">
            Order: 5F721AF77829920004C89E0C
          </Heading>
          <br />
          <Heading fontWeight="normal" as="h2" size="md">
            Shipping
          </Heading>
          <h2>Name:</h2>
          <h2>Email:</h2>
          <h2>Address:</h2>
          <Divider orientation="horizontal" />
          <Heading fontWeight="semibold" as="h1" size="md">
            Payment Method
          </Heading>
          <h2>Method:</h2>
          <h2>Paid on:</h2>
        </VStack>
        <VStack
          maxW={600}
          maxH={850}
          overflow="auto"
          alignItems={"flex-start"}
          gap="4"
        >
          <TableContainer>
            <Heading fontWeight="semibold" as="h2" size="md">
              ORDER SUMMARY
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th isNumeric>Items</Th>
                  <Th isNumeric>Shipping</Th>
                  <Th isNumeric>Tax</Th>
                  <Th isNumeric>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>133.32</Td>
                  <Td>0</Td>
                  <Td>28.5</Td>
                  <Td>161.82</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <TableContainer>
            <Heading fontWeight="semibold" as="h2" size="md">
              ORDER ITEMS
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Picture</Th>
                  <Th>Name</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th isNumeric>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{"[image]"}</Td>
                  <Td>Airpods</Td>
                  <Td>1</Td>
                  <Td>161.82</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </SimpleGrid>
    </Center>
  );
}
