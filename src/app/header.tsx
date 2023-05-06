import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-center w-full h-12 bg-black text-white">
      <div className="flex justify-between w-full max-w-screen-2xl px-5">
        <h1 className="font-bold text-xl">SIMPLECOMMERCE</h1>

        <nav className="flex gap-5">
          <Link className="font-light font-sans text-lg" href="cart">
            Cart
          </Link>

          <Link className="font-light font-sans text-lg" href="login">
            Sing in
          </Link>
        </nav>
      </div>
    </header>
  );
}
