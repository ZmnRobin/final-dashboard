"use client";
import React, { useEffect, useState } from "react";
import {
  BanknotesIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface CardProps {
  title: string;
  value: string;
  color: string;
  type: keyof typeof iconMap;
}

const iconMap = {
  totalOrder: BanknotesIcon,
  approved: CheckIcon,
  cancelled: XMarkIcon,
  totalBill: BanknotesIcon,
};

const Card: React.FC<CardProps> = ({ title, value, type, color }) => {
  const Icon = iconMap[type];

  return (
    <div
      className={`rounded-xl bg-${color ? color : "gray"}-300 p-2 shadow-sm`}
    >
      <div className="bg-red-300 bg-green-300 bg-gray-300"></div>
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
