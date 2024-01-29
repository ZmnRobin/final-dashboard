"use client";
import React from "react";
import Image from "next/image";
import { FoodItemType } from "@/app/_types/FoodItemTypes";
import TakaSign from "./TakaSign";

interface CardProps extends FoodItemType {
  onAddToCart: () => void;
}

const Card: React.FC<CardProps> = ({ name, imageUrl, unitPrice, onAddToCart }) => {

  return (
    <div
      className="bg-white p-4 rounded shadow-md hover:bg-slate-200 overflow-hidden cursor-pointer"
      onClick={onAddToCart}
    >
      <Image src={imageUrl} alt={name} width={100} height={100} />
      <h3 className="text-sm font-semibold line-clamp-2 break-words">
        {name}
      </h3>
      <p className="text-sm font-normal flex flex-row">
        {" "}
        <TakaSign /> {unitPrice}
      </p>
    </div>
  );
};

export default Card;
