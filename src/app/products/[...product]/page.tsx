"use client";

import Comment from "@/app/components/comment";
import Rating from "@/app/components/rating";
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
import Image from "next/image";

export default function Home() {
  return (
    <Center>
      <SimpleGrid m="10" columns={[1, 2]} spacing={5}>
        <VStack maxW={600} alignItems={"flex-start"} gap="2">
          <Image src={"/placeholder.jpg"} alt="" width={600} height={600} />
          <section>
            <Heading as="h1" size="lg">
              Notebook Gamer Lenovo Gaming 3i
            </Heading>
            <Box w={"75%"}>
              <Text fontSize="xs" noOfLines={[1, 2, 3, 4, 5]}>
                Lenovo ideapad Gaming 3i Novo design com 11ª Geração de
                Processadores Intel Core i5-11300H e placa de vídeo NVIDIA
                GeForce GTX 1650 4GB.
              </Text>
            </Box>
          </section>

          <Rating rate={4.3} />

          <Box
            as="button"
            height="50px"
            width="100%"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            lineHeight="1.2"
            border="1px"
            px="8px"
            borderRadius="2px"
            fontSize="14px"
            fontWeight="semibold"
            borderColor="#000"
            color="#4b4f56"
            _hover={{ bg: "#000", textColor: "white" }}
          >
            Buy
          </Box>
          <Stat>
            <StatLabel>Price</StatLabel>
            <StatNumber>R$0.00</StatNumber>
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
          <Comment
            name="ABOGUS"
            title="Gostei!"
            description="Gostei Não"
            date="1-20-2023"
            rate={3}
          />{" "}
          <Comment
            name="ABOGUS"
            title="Gostei!"
            description="Gostei Não"
            date="1-20-2023"
            rate={3}
          />{" "}
          <Comment
            name="ABOGUS"
            title="Gostei!"
            description="Gostei Não"
            date="1-20-2023"
            rate={3}
          />{" "}
          <Comment
            name="ABOGUS"
            title="Gostei!"
            description="Gostei Não"
            date="1-20-2023"
            rate={3}
          />{" "}
          <Comment
            name="ABOGUS"
            title="Gostei!"
            description="Gostei Não"
            date="1-20-2023"
            rate={3}
          />{" "}
          <Comment
            name="ABOGUS"
            title="Gostei!"
            description="Gostei Não"
            date="1-20-2023"
            rate={3}
          />{" "}
          <Comment
            name="ABOGUS"
            title="Gostei!"
            description="Gostei Não"
            date="1-20-2023"
            rate={3}
          />{" "}
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
