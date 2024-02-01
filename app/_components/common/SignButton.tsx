"use client";
import React, { Fragment, useEffect } from "react";
import { PowerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  getNameFromCookies,
  getRoleFromCookies,
  getTokenFromCookies,
} from "@/app/_lib/utils/utilityFunction";

export default function SignButton() {
  const router = useRouter();
  const token = getTokenFromCookies();
  const role = getRoleFromCookies();
  const name = getNameFromCookies();
  const [isLogged, setIsLogged] = React.useState(false);

  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    router.push("/login");
  };
  useEffect(() => {
    if (token && role) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [token, role]);

  return (
    <Fragment>
      {isLogged ? (
        <button
          onClick={handleSignOut}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <span className="hidden md:block">Sign Out {name}</span>
        </button>
      ) : (
        <Link
          href="/login"
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <span className="hidden md:block">Sign In</span>
        </Link>
      )}
    </Fragment>
  );
}
