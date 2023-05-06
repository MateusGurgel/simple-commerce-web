import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-8">
        <div className="w-full h-96 bg-gray-900 flex justify-center items-center text-white">
          <h1>Iphone 15S</h1>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-2  gap-4 items-center w-4/5">
            <div className="bg-black max-w-4xl aspect-square">Box 1</div>
            <div className="bg-black max-w-4xl aspect-square">Box 1</div>
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <div className="grid grid-cols-4 gap-6">
            <div className="h-96 w-80 bg-black">Block</div>
            <div className="h-96 w-80 bg-black">Block</div>
            <div className="h-96 w-80 bg-black">Block</div>
            <div className="h-96 w-80 bg-black">Block</div>

            <div className="h-96 w-80 bg-black">Block</div>
            <div className="h-96 w-80 bg-black">Block</div>
            <div className="h-96 w-80 bg-black">Block</div>
            <div className="h-96 w-80 bg-black">Block</div>
          </div>
        </div>
      </div>
    </main>
  );
}
