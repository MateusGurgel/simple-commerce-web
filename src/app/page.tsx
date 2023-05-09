"use client";
import { SimpleGrid, Flex } from "@chakra-ui/react";
import Banner from "./components/banner";
import ItemCard from "./components/itemCard";
import SquareCard from "./components/squareCard";

export default function Home() {
  return (
    <>
      <Banner />
      <SimpleGrid columns={2} spacing={10}>
        <SquareCard imageURL={"/placeholder.jpg"} href="123" />
        <SquareCard imageURL={"/placeholder.jpg"} href="123" />
      </SimpleGrid>
      <SimpleGrid
        minChildWidth="320px"
        spacing="40px"
        justifyItems="center"
        alignItems="center"
      >
        <ItemCard itemID="123" title="Airpods" />
        <ItemCard itemID="123" title="Airpods" />
        <ItemCard itemID="123" title="Airpods" />
        <ItemCard itemID="123" title="Airpods" />

        <ItemCard itemID="123" title="Airpods" />
        <ItemCard itemID="123" title="Airpods" />
        <ItemCard itemID="123" title="Airpods" />
        <ItemCard itemID="123" title="Airpods" />
      </SimpleGrid>
    </>
  );
}
