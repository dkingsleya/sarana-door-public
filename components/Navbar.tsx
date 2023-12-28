"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CustomButton } from ".";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-evenly items-center sm:px-12 px-6 py-4">
        <Link
          href="/"
          className="flex justify-center items-center xl:min-w-[130px] min-w-[50px]"
        >
          <div>
            <Image
              src="/logo.png"
              alt="Logo"
              width={300}
              height={300}
              priority
              className="object-contain w-auto h-auto"
            />
          </div>
        </Link>
        <Link href="/tentang" className="flex justify-center items-center">
          <CustomButton
            title="Profil"
            btnType="button"
            containerStyles="text-neutral-500 rounded-full bg-white xl:min-w-[130px] min-w-[50px] shadow-md font-bold hover:shadow-lg transition ease-in-out delay-150"
          />
        </Link>
        <Link href="/kontak" className="flex justify-center items-center">
          <CustomButton
            title="Kontak"
            btnType="button"
            containerStyles="text-neutral-500 rounded-full bg-white xl:min-w-[130px] min-w-[50px] shadow-md font-bold hover:shadow-lg transition ease-in-out delay-150"
          />
        </Link>
        {status === "authenticated" ? (
          <Link href="/admin" className="flex justify-center items-center">
            <CustomButton
              title="Admin"
              btnType="button"
              containerStyles="text-neutral-500 rounded-full bg-white xl:min-w-[130px] min-w-[50px] shadow-md font-bold hover:shadow-lg transition ease-in-out delay-150"
            />
          </Link>
        ) : (
          <></>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
