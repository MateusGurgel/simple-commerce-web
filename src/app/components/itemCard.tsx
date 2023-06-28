import Link from "next/link";
import Image from "next/image";
import { VStack, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart";
import { api } from "../api";
import Product from "../interfaces/Product";
import { useRouter } from "next/navigation";
import { endPoint } from "../constants";

interface ItemCardProps {
  title: string;
  itemID: string;
  imageURL: string;
}

export default function ItemCard(props: ItemCardProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  async function handleOnBuy() {
    try {
      const product = await api.get<Product>("/products/" + props.itemID);
      dispatch(addToCart(product.data));
      router.push("/cart");
    } catch (error) {
      toast({
        title: "Something went wrong. Please try again later.",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  }

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
        href={`/products/${props.itemID}`}
        className="flex flex-col items-center justify-center"
      >
        <Image
          src={endPoint + props.imageURL}
          alt=""
          width={237}
          height={162}
        />
        <h1 className="font-normal text-gray-600">{props.title}</h1>
      </Link>

      <button
        className="w-full p-2 bg-black text-center text-white font-thin text-lg"
        onClick={handleOnBuy}
      >
        Buy
      </button>
    </VStack>
  );
}
