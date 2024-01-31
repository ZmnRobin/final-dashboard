"use client";
import React, { useEffect, useState } from "react";
import {
  BanknotesIcon,
  CheckCircleIcon,
  UserGroupIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface CardProps {
  title: string;
  value: string;
  type: keyof typeof iconMap;
}

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  completed: CheckCircleIcon,
  cancelled: XCircleIcon,
};

const Card: React.FC<CardProps> = ({ title, value, type }) => {
  const Icon = iconMap[type];
  const [bgColor, setBgColor] = useState("gray");

  useEffect(() => {
    if (title === "Completed") {
      setBgColor("green");
    }
    if (title === "Cancelled") {
      setBgColor("red");
    }
    if (title === "Total Order") {
      setBgColor("gray");
    }
    if (title === "Total Bill") {
      setBgColor("gray");
    }
  }, [title]);

  return (
    <div className={`rounded-xl bg-${bgColor}-100 p-2 shadow-sm`}>
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
};

export default Card;
