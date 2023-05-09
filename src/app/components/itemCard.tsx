import Link from "next/link";
import Image from "next/image";
import { VStack } from "@chakra-ui/react";

interface ItemCardProps {
  title: string;
  itemID: string;
}

export default function ItemCard(props: ItemCardProps) {
  return (
    <VStack
      justify="space-between"
      textAlign="center"
      shadow="md"
      h={96}
      w={80}
      p={4}
    >
      <Link
        href={`/product/${props.itemID}`}
        className="flex flex-col items-center justify-center"
      >
        <Image src={"/placeholder.jpg"} alt="" width={237} height={162} />
        <h1 className="font-normal text-gray-600">{props.title}</h1>
      </Link>

      <Link
        className="w-full p-2 bg-black text-center text-white font-thin text-lg"
        //Add the item on the card before
        href={`/cart`}
      >
        Buy
      </Link>
    </VStack>
  );
}
