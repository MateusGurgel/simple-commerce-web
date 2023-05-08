export default function Banner() {
  return (
    <div
      className="w-full h-96 bg-gray-900 flex justify-center items-center text-white shadow-lg"
      style={{
        backgroundImage: "url('/banners/iphone.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%",
      }}
    />
  );
}
