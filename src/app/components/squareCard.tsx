import { AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import { endPoint } from "../constants";

interface squareCardProps {
  imageURL: string;
  href: string;
}

export default function SquareCard({ href, imageURL }: squareCardProps) {
  return (
    <Link
      href={href}
      style={{
        backgroundImage: `url(${endPoint + imageURL})`,
        backgroundRepeat: "contain",
        backgroundSize: "cover",
      }}
      className={
        "flex items-end justify-center bg-slate-100 max-w-4xl aspect-square"
      }
    >
      <h1
        className=" text-lg font-sans font-light text-blue-500 flex items-center"
        style={{ paddingBottom: "20%" }}
      >
        {"Learn more"}
        <AiOutlineRight size={15} />
      </h1>
    </Link>
  );
}
