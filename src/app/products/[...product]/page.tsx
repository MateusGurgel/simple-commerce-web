"use client";

import { useSelector, useDispatch } from 'react-redux';
import Comment from "@/app/components/comment";
import Button from "@/app/components/button";
import Rating from "@/app/components/rating";
import { fetcher } from "@/app/api";
import Image from "next/image";
import useSWR from "swr";
import {
  Box,
  Text,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  Center,
} from "@chakra-ui/react";
import LoadingScreen from "@/app/components/loadingScreen";
import Product from "@/app/interfaces/Product";
import NotFoundScreen from "@/app/components/notFoundScreen";
import { addToCart, useCartState } from '@/app/redux/cart';

interface productsProps {
  params: {
    product: string;
  };
}


export default function Home({ params }: productsProps) {
  
  const cartItems = useCartState()
  const dispatch = useDispatch();

  const { data, error, isLoading } = useSWR<Product>(
    "/products/" + params.product,
    fetcher
  );

  function handleOnBuy(){

    if (!data){
      return
    }

    dispatch(addToCart(data));
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !data) {
    return <NotFoundScreen />;
  }

  return (
    <Center>
      <SimpleGrid m="10" columns={[1, 2]} spacing={5}>
        <VStack maxW={600} alignItems={"flex-start"} gap="2">
          <Image src={"/placeholder.jpg"} alt="" width={600} height={600} />
          <section>
            <Heading as="h1" size="lg">
              {data?.name}
            </Heading>
            <Box w={"75%"}>
              <Text fontSize="xs" noOfLines={[1, 2, 3, 4, 5]}>
                {data.description}
              </Text>
            </Box>
          </section>

          <Rating rate={data.rate} />

          <Button OnClick={handleOnBuy}>Buy</Button>
          <Stat>
            <StatLabel>Price</StatLabel>
            <StatNumber>R${data.price}</StatNumber>
          </Stat>
        </VStack>
        <VStack
          maxW={600}
          maxH={850}
          overflow="auto"
          alignItems={"flex-start"}
          gap="2"
        >
          <Comment
            name="ABOGUS"
            title="Gostei!"
            description="Gostei Não"
            date="1-20-2023"
            rate={3}
          />
        </VStack>
      </SimpleGrid>
    </Center>
  );
}
