"use client";
import { SimpleGrid, Flex, Spinner, Box } from "@chakra-ui/react";
import Banner from "./components/banner";
import ItemCard from "./components/itemCard";
import Product from "./interfaces/Product";
import { fetcher } from "./api";
import useSWR from "swr";
import useSetupAuth from "./hooks/useSetupAuth";

export default function Home() {
  useSetupAuth();
  const { data, isLoading } = useSWR<Product[]>("/products", fetcher);

  return (
    <>
      <Banner />
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
              imageURL={product.image}
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
