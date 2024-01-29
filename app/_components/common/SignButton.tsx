'use client'
import React from 'react'
import { PowerIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function SignButton() {
    const router = useRouter();
    const token=Cookies.get('token')
    const role=Cookies.get('role')

    const handleSignOut=()=>{
      Cookies.remove("token")
      Cookies.remove("role")
      router.push('/login')
    }

    if (token && role)
    return (
      <div className="">
        <button onClick={handleSignOut} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out {role}</div>
        </button>
      </div>
    );

    return (
        <>
        <Link href="/login" className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <span className="hidden md:block">Sign In</span>
        </Link>
        </>
    )
    }
