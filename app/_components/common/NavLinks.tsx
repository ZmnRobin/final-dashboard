"use client";
import {
  UserGroupIcon,
  UserCircleIcon,
  PrinterIcon,
  ListBulletIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { getRoleFromCookies } from "@/app/_lib/utils/utilityFunction";
import { useEffect, useState } from "react";

type LinkType = {
  name: string;
  href: string;
  icon: any;
};

const admin = [
  { name: "Overview", href: "/admin", icon: UserCircleIcon },
  { name: "Users", href: "/admin/users", icon: UserGroupIcon },
];
const manager = [
  { name: "Overview", href: "/manager", icon: UserCircleIcon },
  { name: "Product List", href: "/manager/products", icon: QueueListIcon },
  { name: "Order List", href: "/manager/order", icon: ListBulletIcon },
];
const seller = [
  { name: "Orders", href: "/seller", icon: QueueListIcon },
  { name: "Sell", href: "/seller/pos", icon: PrinterIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const role = getRoleFromCookies();
  const [links, setLinks] = useState<LinkType[]>();

  useEffect(() => {
    if (role === "admin") {
      setLinks(admin);
    } else if (role === "manager") {
      setLinks(manager);
    } else if (role === "seller") {
      setLinks(seller);
    }
  }, [role]);

  return (
    <>
      {links?.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
