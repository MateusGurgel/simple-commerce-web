import { Flex } from "@chakra-ui/react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

interface RatingProps {
  rate: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function Rating({ rate }: RatingProps) {
  function numberToStars(number: number) {
    const elements: JSX.Element[] = [];
    number = clamp(number, 0, 5);

    for (let i = 0; i < 5; i++) {
      if (number <= 0) {
        elements.push(<IoIosStarOutline key={i} />);
        continue;
      }

      if (number < 1) {
        number = 0;
        elements.push(<IoIosStarHalf key={i} />);
        continue;
      }

      elements.push(<IoIosStar key={i} />);
      number--;
    }

    return elements;
  }

  return <Flex>{numberToStars(rate)}</Flex>;
}
