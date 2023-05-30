"use client";

import Link from "next/link";
import { SingOutUser, useUserState } from "../redux/user";
import { useDispatch } from "react-redux";

export default function Header() {
  const {user} = useUserState();
  const dispath = useDispatch();
  
  function handleLogout() {
    dispath<any>(SingOutUser())
  }

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

          {!user ? (
            <>
              <Link className="font-light font-sans text-base" href="login">
                Sing in
              </Link>

              <Link className="font-light font-sans text-base" href="register">
                Sign up
              </Link>
            </>
          ) : (
            <a className="font-light font-sans text-base cursor-pointer" onClick={handleLogout} >
              Sign out
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
