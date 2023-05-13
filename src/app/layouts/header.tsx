import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-center w-full h-12 bg-black text-white">
      <div className="flex justify-between w-full max-w-screen-2xl px-5">
        <Link href="/">
          <h1 className="font-bold text-xl">SC</h1>
        </Link>

        <nav className="flex gap-10">
          <Link className="font-light font-sans text-base" href="cart">
            Cart
          </Link>

          <Link className="font-light font-sans text-base" href="login">
            Sing in
          </Link>
          <Link className="font-light font-sans text-base" href="register">
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}
