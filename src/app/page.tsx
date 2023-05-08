import Banner from "./components/banner";
import ItemCard from "./components/itemCard";
import SquareCard from "./components/squareCard";
export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-8">
        <Banner />
        <div className="flex justify-center">
          <div className="grid grid-cols-2  gap-4 items-center w-4/5">
            <SquareCard imageURL={"/placeholder.jpg"} href="123" />
            <SquareCard imageURL={"/placeholder.jpg"} href="123" />
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <div className="grid grid-cols-4 gap-6">
            <ItemCard itemID="123" title="Airpods" />
            <ItemCard itemID="123" title="Airpods" />
            <ItemCard itemID="123" title="Airpods" />
            <ItemCard itemID="123" title="Airpods" />

            <ItemCard itemID="123" title="Airpods" />
            <ItemCard itemID="123" title="Airpods" />
            <ItemCard itemID="123" title="Airpods" />
            <ItemCard itemID="123" title="Airpods" />
          </div>
        </div>
      </div>
    </main>
  );
}
