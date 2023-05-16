"use client";

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
    <Center textAlign="center" p={4}>
          <TableContainer>
            <Heading fontWeight="semibold" as="h2" size="md">
              ORDER ITEMS
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>DATE</Th>
                  <Th isNumeric>TOTAL</Th>
                  <Th isNumeric>PAID</Th>
                  <Th>DELIVERED</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>AS23!@3</Td>
                  <Td>2020-09-28</Td>
                  <Td>229</Td>
                  <Td>2020-09-28</Td>
                  <Td>X</Td>
                  <Td>Details</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
    </Center>
  );
}
