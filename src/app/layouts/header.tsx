"use client";

import Link from "next/link";
import { SingOutUser, useUserState } from "../redux/user"; //RiAdminFill
import { RiAdminFill } from "react-icons/Ri"; //RiAdminFill

import { useDispatch } from "react-redux";
import { HiUser, HiShoppingCart, HiLogout } from "react-icons/hi";

export default function Header() {
  const { user } = useUserState();
  const dispath = useDispatch();

  function handleLogout() {
    dispath<any>(SingOutUser());
  }

  return (
    <header className="flex items-center justify-center w-full h-12 bg-black text-white">
      <div className="flex justify-between w-full max-w-screen-2xl px-5">
        <Link href="/">
          <h1 className="font-bold text-xl">SC</h1>
        </Link>

        <nav className="flex gap-10">
          <Link className="flex justify-center items-center" href="cart">
            <HiShoppingCart size={20} />
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
            <>
              <Link className="flex justify-center items-center" href="profile">
                <HiUser size={20} />
              </Link>
              {user.is_admin && (
                <Link
                  className="flex justify-center items-center"
                  href="admin/dashboard"
                >
                  <RiAdminFill size={20} />
                </Link>
              )}
              <a
                className="flex justify-center items-center pointer"
                onClick={handleLogout}
              >
                <HiLogout size={20} />
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
