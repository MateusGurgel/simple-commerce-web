"use client";
import { SimpleGrid, Flex, Spinner, Box } from "@chakra-ui/react";
import Banner from "./components/banner";
import ItemCard from "./components/itemCard";
import SquareCard from "./components/squareCard";
import Product from "./interfaces/Product";
import { fetcher } from "./api";
import useSWR from "swr";

export default function Home() {
  const { data, isLoading } = useSWR<Product[]>("/products", fetcher);

  return (
    <>
      <Banner />
      <SimpleGrid columns={2} spacing={10}>
        <SquareCard imageURL={"/placeholder.jpg"} href="123" />
        <SquareCard imageURL={"/placeholder.jpg"} href="123" />
      </SimpleGrid>
      <SimpleGrid
        p={10}
        minChildWidth="320px"
        spacing="40px"
        justifyItems="center"
        alignItems="center"
      >
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          data &&
          data.map((product) => (
            <ItemCard
              key={product.id}
              itemID={product.id}
              title={product.name}
            />
          ))
        )}
      </SimpleGrid>
    </>
  );
}
